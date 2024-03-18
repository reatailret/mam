import type { Plugin, ViteDevServer } from 'vite'
import $ from 'mol_tree2'
import { ModuleNode, normalizePath, transformWithEsbuild } from 'vite'
import { $mol_view_tree2_to_js } from './tree2js'
import { $mol_tree2_js_to_text } from './text'

import fs from 'node:fs'
import process from 'node:process'
import path, { basename } from 'node:path'
export interface Options
{
	include?: string | RegExp | ( string | RegExp )[]
	exclude?: string | RegExp | ( string | RegExp )[]

	isProduction?: boolean
}

export interface ResolvedOptions extends Options
{
	root: string
	sourceMap: boolean
	cssDevSourcemap: boolean
	devServer?: ViteDevServer
	devToolsEnabled?: boolean
}


const view_tree_regex = /\.view.tree$/

const virtualModuleId = 'virtual:mol-module:'
const resolvedVirtualModuleId = '\0' + virtualModuleId
const virtualModuleRootId = 'virtual:molmain-module:'
const resolvedVirtualModuleRootId = '\0' + virtualModuleRootId

const checkFQNEXists = ( fqn_string: string, exts: string[] ): any =>
{
	const result = []
	const expl = fqn_string.split( '_' )
	const class_end_string = expl[ expl.length - 1 ]
	const path = normalizePath( process.cwd() + '/' + fqn_string.replace( /_/g, '/' ) )

	for( const file of exts )
	{

		let file_path = `${ path }/${ class_end_string }${ file }`
		if( fs.existsSync( file_path ) )
		{
			result.push( { path: file_path, ext: file } )
		}
		else
		{

			let expl2 = path.split( '/' )
			file_path = `${ expl2.slice( 0, expl2.length - 1 ).join( '/' ) }/${ expl[ expl.length - 2 ] }${ file }`



			if( fs.existsSync( file_path ) && !fs.statSync( file_path ).isDirectory() )
			{

				result.push( { path: file_path, ext: file } )
			}
		}
		file_path = `${ path }/${ class_end_string }/${ class_end_string }${ file }`
		if( fs.existsSync( file_path ) )
		{
			result.push( { path: file_path, ext: file } )
		}
	}
	return result.length ? result : null
}
const getExports = ( source: string ) =>
{

	const reg = /export[ ]+?\{([\$\w ,]+)}/gm
	let d = Array.from( source.matchAll( reg ) ).map( el => el[ 1 ] )
	let result = []
	d.map( el =>
	{
		result = [ ...result, ...el.split( ',' ).map( el2 => el2.trim() ) ]
	} )
	return new Set( result )
}
const getFQNClassesFromSourceRaw = ( source: string, ) =>
{
	let m: RegExpExecArray

	const fqn_classes_regex = /\$([a-zA-Z0-9_]{2,})/gm

	let d = Array.from( source.matchAll( fqn_classes_regex ) ).map( el => el[ 0 ] )
	const exportsSet = getExports( source )
	d = d.filter( el => !exportsSet.has( el ) )
	return {
		exportings: exportsSet,
		classes: new Set( d )
	}

}
const getFQNClassesFromSourceDeclarations = ( source: string ) =>
{
	let m: RegExpExecArray

	const fqn_classes_regex = /(function|class|extends)[ ]+\$([a-zA-Z0-9_]{2,})/gm

	const d = Array.from( source.matchAll( fqn_classes_regex ) ).map( el => el[ 2 ] )
	return [ ...new Set( d ) ]

}
let $injected = false
let mols = new Set()
const getDepFiles = ( toLoadClasses: string[], extsensions: string[] ) =>
{

	const DEPS = []
	for( const iterator of toLoadClasses )
	{

		let files = checkFQNEXists( iterator.replace( /\$/gm, '' ), extsensions )

		if( files )
		{


			for( const id_dep of files )
			{

				DEPS.push( id_dep )


				////console.log( "AD DEP", id_dep )

			}

		}

	}
	return [ ...DEPS ]
}
const loadDeps = ( source: string, exclude?: string, exporting?: boolean ) =>
{
	const imports = []

	const DEPS = new Set()
	const DEPS_CLASSES = new Set()
	DEPS_CLASSES.add( 'mol_dom_context' )
	if( exclude )
		DEPS.add( exclude )
	let i = 0




	const toLoadClasses = getFQNClassesFromSource( source )


	for( const iterator of toLoadClasses )
	{

		let files = checkFQNEXists( iterator, [ '.view.tree', '.ts', '.view.ts', '.web.ts' ] )

		if( files )
		{
			files = files.filter( el => !DEPS.has( el ) )

			for( const id_dep of files )
			{

				//DEPS.add( id_dep )
				//console.log( "ADD DEP", id_dep )



				let s = `
						
						import {$${ iterator } as $${ iterator }_${ i }} from '${ id_dep }';
						
						$.$${ iterator } = $${ iterator }_${ i };
						
						`

				if( exporting )
				{
					if( !DEPS_CLASSES.has( iterator ) )
					{

						DEPS_CLASSES.add( iterator )
						s += `export {$${ iterator }_${ i } as $${ iterator }}`
					}

				}
				////console.log(s)
				imports.push( s )
				i++

			}

		}

	}

	return imports.join( '' )

}
const getClassFromPath = ( path: string ) =>
{
	return '$'+normalizePath( path ).replace( normalizePath( process.cwd() ) + '/', '' ).split( '.' )[ 0 ].split( '/' ).slice( 0, -1 ).join( '_' )
}


let ROOT_ID = ''
let ROOT_ID_TREE = ''
let ROOT_ID_LOADED = false
let ROOT_ID_TREE_LOADED = false
let ROOT_CLASS = ''

const treeToJs = (rawSource:string)=>{
	const tree = $.$mol_tree2_from_string( rawSource )
	const js_text_tree = $mol_tree2_js_to_text( $mol_view_tree2_to_js( tree ) )
	const code = $.$mol_tree2_text_to_string( js_text_tree )
	const map = JSON.stringify( $.$mol_tree2_text_to_sourcemap( js_text_tree ), null, '\t' )
	return {code,map}
}
let srvsr :ViteDevServer = null
export default function mamPlugin( rawOptions: Options = {} ): Plugin<Api>
{

	let options = {
		isProduction: process.env.NODE_ENV === 'production',
		include: [ view_tree_regex, /\.ts$/ ],
		...rawOptions,
		root: process.cwd(),
		sourceMap: true
	}

	return {
		name: 'vite:mam',

		api: {
			get options()
			{
				return options
			},
			set options( value )
			{
				options = value
			},
			version: '0.1',
		},

		/*handleHotUpdate(ctx) {
		  if (options.value.compiler.invalidateTypeCache) {
			options.value.compiler.invalidateTypeCache(ctx.file)
		  }
		  if (typeDepToSFCMap.has(ctx.file)) {
			return handleTypeDepChange(typeDepToSFCMap.get(ctx.file)!, ctx)
		  }
		  if (filter.value(ctx.file)) {
			return handleHotUpdate(
			  ctx,
			  options.value,
			  customElementFilter.value(ctx.file),
			)
		  }
		},*/

		config( config )
		{

		},
		handleHotUpdate(ctx) {
			console.log(ctx.file)
			const mid = ctx.file === ROOT_ID?resolvedVirtualModuleRootId + ctx.file:resolvedVirtualModuleId + ctx.file
			const virtualModule = ctx.server.moduleGraph.getModuleById(mid);
    		ctx.server.moduleGraph.invalidateModule(virtualModule);
			ctx.server.ws.send({
				type: 'update',
				updates: [
				  {
					acceptedPath: mid,
					path: mid,
					timestamp: ctx.timestamp,
					type: 'js-update',
				  },
				],
			  });
			
		},
		
		transformIndexHtml( html, ctx )
		{
			if(ctx.server){
				const cl = getFQNClassesFromSourceRaw(html)
				
				if(cl.classes.size){
					
					ROOT_CLASS = [...cl.classes][0]
					return [{
						tag:'script',
						attrs:{
							src: '/' + virtualModuleRootId+ROOT_CLASS,
							type:'module'
						}
					},
					{
						tag:'script',
						attrs:{
							
							
						},
						children:`var $ = globalThis;$.$$ = $;`
					}
				]
				}
				else
				{
					throw new Error("root class not found");
				}
				
			}
			else if(ctx.bundle){
				html = html.replace(
					'<script type="module" crossorigin src="/assets',
					`<script type="module" crossorigin src="assets`,
				)
				html = html.replace(
					'<link rel="stylesheet" href="/assets',
					`<link rel="stylesheet" href="assets`,
				)
				return html
			}
			
			
		},
		configResolved( config )
		{
			////console.log('config resolved', config)
			options = {
				...options,
				root: config.root,
				sourceMap: config.command === 'build' ? !!config.build.sourcemap : true,
				isProduction: config.isProduction,

			}
		},

		configureServer(server) {
			// Example: wait for a client to connect before sending a message
			srvsr = server
		  },

		buildStart()
		{

		},

		async resolveId( id )
		{
			console.log('RESOLVE', id)
			if(id.indexOf(virtualModuleId) >=0 ){
				const orgId = id.split(virtualModuleId)[1];
				srvsr.watcher.add(orgId)
				return resolvedVirtualModuleId + orgId
			}
			else if(id.indexOf(virtualModuleRootId) === 1){
				
				const deps = getDepFiles([ROOT_CLASS],['.view.tree'])
					if(!deps.length){
						throw new Error("Deps not found");
						
					}
				ROOT_ID_TREE = deps[0].path
				
				return resolvedVirtualModuleRootId + deps[0].path
			}




			return null
		},
		moduleParsed( info )
		{

		},
		
		async load_( id: string, opt )
		{

			console.log( "LOAD", id )
			if(
				/#MOL_PROXY$/.test( id ) )
			{

				id = id.replace( '#MOL_PROXY', '' )


				let ss = fs.readFileSync( id, 'utf-8' )
				let code = ''
				let map 
				let isTree = /\.view\.tree/.test(id)
				let isView= /\.view\.ts/.test(id)
				if( isTree )
				{
					isTree = true
					const tree = $.$mol_tree2_from_string( ss )
					const js_text_tree = $mol_tree2_js_to_text( $mol_view_tree2_to_js( tree ) )
					code = $.$mol_tree2_text_to_string( js_text_tree )
					map = JSON.stringify( $.$mol_tree2_text_to_sourcemap( js_text_tree ), null, '\t' )

				}
				
				else
				{
					////console.log( "COMPILE", id )
					const br = await transformWithEsbuild(
						ss,
						id,
						{
							loader: 'ts',
							target: 'esnext',
							sourcemap: true,
						}
					)
					code = br.code
					map = br.map
				}





				//const cl = 'module_' + getClassFromPath( id ) + basename( id ).replace( /\./g, '_' )
				//code = code.replace( 'var $;', `var ${ cl };` )
				//code = code.replace( '($ || ($ = {}));', `(${ cl } || (${ cl } = {}));` )
				////console.log( code )

				const exported = new Set()
				let im = ''
				let im2 = ''
				let virtmod = `mol_module:`
				const D = new Set()

				let { classes: mol_classes, exportings } = getFQNClassesFromSourceRaw( code )

				let exts_search = [ '.view.ts','.view.tree', '.ts', '.web.ts', '.css','.view.css'  ]
				

				////console.log( 'mol_classes', mol_classes )
				////console.log( 'exportings', exportings )
				let i = 0
				const cur_mol_class = getClassFromPath( id )

				let curExports = exportings
				let curExportsId = new Set()
				
				if(isTree && id == ROOT_ID_TREE)
				{
					ROOT_ID_TREE_LOADED = true
				}
				if(isView && id == ROOT_ID)
				{
					ROOT_ID_LOADED = true
				}
				
				for( const mol_class of [ ...mol_classes ] )
				{
					if( curExports.has( mol_class ) ) continue
					
					
					mols.add( mol_class )
					
					let files = getDepFiles( [ mol_class ], exts_search )
					////console.log( 'DEPS', files )
					for( const { path: file, ext } of files )
					{
						if(isTree && file == ROOT_ID_TREE &&  ROOT_ID_LOADED){
							
							continue
							
						}
						if(isView && (file == ROOT_ID)){
							
							continue
							
						}
						
						if( file == id ) continue
						//if( file == ROOT_ID ) continue
						
						////console.log( '#### LOAD FROM', mol_class, file )
						if(ext === '.view.css' || ext === '.css'){
							im += `
									import '${ file }';
									
									`
						}
						else
						{
							const f = (/\.ts$/.test( file ) || /\.view\.tree$/.test( file )) ? ( file + '#MOL_PROXY' ) : file
							
							
							if( curExportsId.has( f ) ) continue
							curExportsId.add( f )
							//console.log("CALl LOAD ", f)
							const { code: code2, importedIdResolutions } = await this.load( { id: f, resolveDependencies: true, moduleSideEffects: 'no-treeshake' } )
	
							const { classes: m_classes, exportings: exportings2 } = getFQNClassesFromSourceRaw( code2 )
							
							
							if( ext !== '.view.ts' &&  ext !== '.view.css'){
								
								if(ext == '.view.tree')
									im += `
									import  '${ f }';
									
									`
								else
								for( const m_class of [ ...exportings2 ] )
								{
									if(!mol_classes.has(m_class)) continue;
									if( curExports.has( m_class ) ) continue
									curExports.add(m_class)
									im += `
									import {${ m_class }} from '${ f }';
									$.${ m_class } = ${ m_class };
									`
									
								}
							}
							else {
								//console.log("LOAD VIEW TS", file)
								im += `
									import '${ f }';
									
									`
							}
							
							if( ext === '.web.ts' )
							{
								im += `
								import '${ f }';
								
								`
								////console.log( 'LOAD WEB', f )
							}
							
						}

						
					}


				}
				if( isView ){
					////console.log("WRAP VIEW", id)
				
					code = `
					import JSConfetti from 'js-confetti'
					(function($){ //console.log($.$mol_vite);
						
						
						${code}
						`+
						`

						
						$.${cur_mol_class} = ${cur_mol_class};
						//Object.defineProperty($.${cur_mol_class},'name', {value:'${cur_mol_class}', configurable:true});
						`
						+`
    					
						})($ || ($={}));
						`
					
					

					
				}

				code = im + code

				
				return {
					code: code,
					map: map,
					meta: {
						vite: {
							lang: 'js',

						},
					},

				}
			}
			else if( view_tree_regex.test( id ) )
			{
				ROOT_ID_TREE = id
				let f = id + '#MOL_PROXY'
				const cl = getClassFromPath(id)
				//console.log('ROOT', cl)
				let files = getDepFiles( [ cl ], ['.view.ts'] )
				if(files.length){
					f = files[0].path + '#MOL_PROXY';
					ROOT_ID = files[0].path;
					//console.log("SET ROOT", ROOT_ID)
				}
				
				//const c = await this.load( { id: f, resolveDependencies: true, moduleSideEffects: 'no-treeshake' } )				
				return {
					code: `
					var $ = globalThis;
					$.$$ = $;
					import '${f}';
					`
				}
			}
			return null
		},
		async load( id: string, opt )
		{

			console.log( "LOAD", id )
			if(
				id.indexOf(resolvedVirtualModuleRootId) === 0)
			{
				id = id.split(resolvedVirtualModuleRootId)[1];
				let f = virtualModuleId + id;

				let files = getDepFiles( [ ROOT_CLASS ], ['.view.ts'] )
				if(files.length){
					f = virtualModuleId + files[0].path;
					ROOT_ID = files[0].path;
					//console.log("SET ROOT", ROOT_ID)
				}
					
				return {
					code: `
					
				
					import '${f}';
					;if (import.meta.hot) {
						import.meta.hot.accept((newModule) => {
							console.log("hot update", newModule)
						})
					  } else console.log('not hot');	
					`
				}
			}

			else if(
				id.indexOf(resolvedVirtualModuleId) >= 0)
			{

				
				id = id.split(resolvedVirtualModuleId)[1];


				let ss = fs.readFileSync( id, 'utf-8' )
				let code = ''
				let map 
				let isTree = /\.view\.tree/.test(id)
				let isView= /\.view\.ts/.test(id)
				if( isTree )
				{
					console.log("parse tree", id)
					isTree = true
					const cm = treeToJs(ss)
					code = cm.code;
					map = cm.map

					code = code + `;if (import.meta.hot) {
						import.meta.hot.accept((newModule) => {
							console.log("new module tree", newModule)
							if(newModule['$mol_viewtest'])newModule['$mol_viewtest'].autobind()
							if(newModule['$mol_vite'])newModule['$mol_vite'].autobind()
							
						})
					  } `

				}
				
				else
				{
					////console.log( "COMPILE", id )
					const br = await transformWithEsbuild(
						ss,
						id,
						{
							loader: 'ts',
							target: 'esnext',
							sourcemap: true,
						}
					)
					code = br.code
					map = br.map

					code = code + `;if (import.meta.hot) {
						import.meta.hot.accept((newModule) => {
							console.log("new module", newModule)
						})
					  } `
				}

				



				//const cl = 'module_' + getClassFromPath( id ) + basename( id ).replace( /\./g, '_' )
				//code = code.replace( 'var $;', `var ${ cl };` )
				//code = code.replace( '($ || ($ = {}));', `(${ cl } || (${ cl } = {}));` )
				////console.log( code )

				const exported = new Set()
				let im = ''
				let im2 = ''
				let virtmod = `mol_module:`
				const D = new Set()

				let { classes: mol_classes, exportings } = getFQNClassesFromSourceRaw( code )

				let exts_search = [ '.view.ts','.view.tree', '.ts', '.web.ts', '.css','.view.css'  ]
				

				////console.log( 'mol_classes', mol_classes )
				////console.log( 'exportings', exportings )
				let i = 0
				const cur_mol_class = getClassFromPath( id )

				let curExports = exportings
				let curExportsId = new Set()
				
				if(isTree && id == ROOT_ID_TREE)
				{
					ROOT_ID_TREE_LOADED = true
				}
				if(isView && id == ROOT_ID)
				{
					ROOT_ID_LOADED = true
				}
				
				for( const mol_class of [ ...mol_classes ] )
				{
					if( curExports.has( mol_class ) ) continue
					
					
					mols.add( mol_class )
					
					let files = getDepFiles( [ mol_class ], exts_search )
					////console.log( 'DEPS', files )
					for( const { path: file, ext } of files )
					{
						if(isTree && file == ROOT_ID_TREE &&  ROOT_ID_LOADED){
							
							continue
							
						}
						if(isView && (file == ROOT_ID)){
							
							continue
							
						}
						
						if( file == id ) continue
						//if( file == ROOT_ID ) continue
						
						////console.log( '#### LOAD FROM', mol_class, file )
						if(ext === '.view.css' || ext === '.css'){
							im += `
									import '${ file }';
									
									`
						}
						else
						{
							const f = (/\.ts$/.test( file ) || /\.view\.tree$/.test( file )) ? ( virtualModuleId + file  ) : file
							
							
							if( curExportsId.has( f ) ) continue
							curExportsId.add( f )
							//console.log("CALl LOAD ", f)
							
							//const { code: code2, importedIdResolutions } = await this.load( { id: f, resolveDependencies: true, moduleSideEffects: 'no-treeshake' } )
							let code2 = ''
							if(/\.view\.tree$/.test( file )){
								code2 = treeToJs(fs.readFileSync( file, 'utf-8' )).code
							}
							else {
								
								code2 = fs.readFileSync( file, 'utf-8' )
							}
	
							const { classes: m_classes, exportings: exportings2 } = getFQNClassesFromSourceRaw( code2 )
							
							
							if( ext !== '.view.ts' &&  ext !== '.view.css'){
								
								if(ext == '.view.tree')
									im += `
									import  '${ f }';
									
									`
								else
								for( const m_class of [ ...exportings2 ] )
								{
									if(!mol_classes.has(m_class)) continue;
									if( curExports.has( m_class ) ) continue
									curExports.add(m_class)
									im += `
									import {${ m_class }} from '${ f }';
									$.${ m_class } = ${ m_class };
									`
									
								}
							}
							else {
								//console.log("LOAD VIEW TS", file)
								im += `
									import '${ f }';
									
									`
							}
							
							if( ext === '.web.ts' )
							{
								im += `
								import '${ f }';
								
								`
								////console.log( 'LOAD WEB', f )
							}
							
						}

						
					}


				}
				if( isView ){
					////console.log("WRAP VIEW", id)
				
					code = `
					//import JSConfetti from 'js-confetti'
					(function($){ //console.log($.$mol_vite);
						
						
						${code}
						`+
						`

						
						$.${cur_mol_class} = ${cur_mol_class};
						//Object.defineProperty($.${cur_mol_class},'name', {value:'${cur_mol_class}', configurable:true});
						`
						+`
    					
						})($ || ($={}));
						
						`
					
					

					
				}

				code = im + code 

				
				return {
					code: code,
					map: map,
					meta: {
						vite: {
							lang: 'js',

						},
					},

				}
			}
			
			return null
		},
	
		renderChunk( code )
		{

			let s = `//console.log( $ ); `
			for( const iterator of [ ...mols ] )
			{
				s += `var $${ iterator } = $[ '$${ iterator }' ]; `
			}
			return `
			//var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
			var $ = globalThis
			$.$$ = $
			//module.exports = $
		//	const classDeps = new Set()
			` + code + ''
		},
		transform( code: string, id )
		{

			console.log('transform', id)

		}

	}
}
