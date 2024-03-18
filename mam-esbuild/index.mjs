import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import {
	$,
	$mol_tree2_js_to_text,
	$mol_view_tree2_to_js,
} from "./treepackage.mjs";
const repoPath = process.cwd().replace(/\\/g,'/');

const treeToJs = (rawSource) => {
	const tree = $.$mol_tree2_from_string(rawSource);
	const js_text_tree = $mol_tree2_js_to_text($mol_view_tree2_to_js(tree));
	const code = $.$mol_tree2_text_to_string(js_text_tree);
	const map = $.$mol_tree2_text_to_sourcemap(js_text_tree);
	return { code, map };
};
let ROOT_ID = "";
let ROOT_ID_TREE = "";
let ROOT_ID_LOADED = false;
let ROOT_ID_TREE_LOADED = false;
let ROOT_CLASS = "";
const getClassFromPath = ( path_ ) =>
{
	return '$'+path_.replace( repoPath + '/', '' ).split( '.' )[ 0 ].split( '/' ).slice( 0, -1 ).join( '_' )
}
const checkFQNEXists = (fqn_string, exts) => {
	const result = [];
	const expl = fqn_string.split("_");
	const class_end_string = expl[expl.length - 1];
	const pathf =  path.normalize (
		process.cwd() + "/" + fqn_string.replace(/_/g, "/")
	).replace(/\\/g,'/');

	for (const file of exts) {
		let file_path = `${pathf}/${class_end_string}${file}`;
		if (fs.existsSync(file_path)) {
			result.push({ path: file_path, ext: file });
		} else {
			let expl2 = pathf.split("/");
			file_path = `${expl2.slice(0, expl2.length - 1).join("/")}/${
				expl[expl.length - 2]
			}${file}`;

			if (
				fs.existsSync(file_path) &&
				!fs.statSync(file_path).isDirectory()
			) {
				result.push({ path: file_path, ext: file });
			}
		}
		file_path = `${pathf}/${class_end_string}/${class_end_string}${file}`;
		if (fs.existsSync(file_path)) {
			result.push({ path: file_path, ext: file });
		}
	}
	return result.length ? result : null;
};
const getExports = (source) => {
	const reg = /export[ ]+?\{([\$\w ,]+)}/gm;
	let d = Array.from(source.matchAll(reg)).map((el) => el[1]);
	let result = [];
	d.map((el) => {
		result = [...result, ...el.split(",").map((el2) => el2.trim())];
	});
	return new Set(result);
};
const getFQNClassesFromSourceRaw = (source) => {
	let m;

	const fqn_classes_regex = /\$([a-zA-Z0-9_]{2,})(?![\w'"])/gm;

	let d = Array.from(source.matchAll(fqn_classes_regex)).map((el) => el[0]);
	const exportsSet = getExports(source);
	d = d.filter((el) => !exportsSet.has(el));
	return {
		exportings: exportsSet,
		classes: new Set(d),
	};
};
const getDepFiles = (toLoadClasses, extsensions) => {
	const DEPS = [];
	for (const iterator of toLoadClasses) {
		let files = checkFQNEXists(iterator.replace(/\$/gm, ""), extsensions);

		if (files) {
			for (const id_dep of files) {
				DEPS.push(id_dep);

				////console.log( "AD DEP", id_dep )
			}
		}
	}
	return [...DEPS];
};
const addImports = (code, id, isTree = false, isView = false) => {
	let { classes: mol_classes, exportings } = getFQNClassesFromSourceRaw(code);
	let exts_search = [
		
		".view.tree",
		".view.ts",
		".ts",
		".web.ts",
		".view.css.ts",
		".css",
		".view.css",
	];

	let curExports = exportings;

	if (isTree && id == ROOT_ID_TREE) {
		ROOT_ID_TREE_LOADED = true;
	}
	if (isView && id == ROOT_ID) {
		ROOT_ID_LOADED = true;
	}

	let im;
	for (const mol_class of [...mol_classes]) {
		if (curExports.has(mol_class)) continue;

		

		let files = getDepFiles([mol_class], exts_search);
		////console.log( 'DEPS', files )
		for (const { path: file, ext } of files) {
			if (isTree && file == ROOT_ID_TREE && ROOT_ID_LOADED) {
				continue;
			}
			if (isView && file == ROOT_ID) {
				continue;
			}

			if (file == id) continue;
			//if (file == ROOT_ID) continue;

			////console.log( '#### LOAD FROM', mol_class, file )
			if (ext === ".view.css" || ext === ".css") {
				im += `
									import '${file}';
									
									`;
			} else {
				const f = file
					

				let code2 = "";
				if (/\.view\.tree$/.test(file)) {
					code2 = treeToJs(fs.readFileSync(file, "utf-8")).code;
				} else {
					code2 = fs.readFileSync(file, "utf-8");
				}

				const { classes: m_classes, exportings: exportings2 } =
					getFQNClassesFromSourceRaw(code2);

				if (ext !== ".view.ts" && ext !== ".view.css") {
					if (ext == ".view.tree")
						im += `
									import  '${f}';
									
									`;
					else
						for (const m_class of [...exportings2]) {
							if (!mol_classes.has(m_class)) continue;
							if (curExports.has(m_class)) continue;
							curExports.add(m_class);
							im += `
									import {${m_class}} from '${f}';
									$.${m_class} = ${m_class};
									`;
						}
				} else {
					//console.log("LOAD VIEW TS", file)
					im += `
									import '${f}';
									
									`;
				}

				if (ext === ".web.ts") {
					im += `
								import '${f}';
								
								`;
				}
				if (ext === ".view.css.ts") {
					console.log('IMPORT ', f)
					im += `
								import '${f}';
								
								`;
				}
			}
		}
	}
	return im;
};
const MAM_NAMESPACE = 'mam_namespace'
let mamEsbuild = {
	name: "mamEsbuild",
	setup(build) {
		build.onResolve({ filter: /\.view.tree$/ }, (args) => {
			
			return { path: args.path, };
		});

		build.onResolve({ filter: /\.view.ts$/ }, (args) => {
			
			return { path: args.path,  pluginData :{ isRoot:true, isView:true }};
		});

		build.onResolve({ filter: /\.ts$/ }, (args) => {
			
			return { path: args.path,  sideEffects:true, };
		});

		build.onResolve({ filter: /\.css$/ }, (args) => {
			
			return { path: args.path, sideEffects:true, };
		});

		build.onResolve({ filter: /\$[a-zA-Z0-9_]/ }, (args) => {
			ROOT_CLASS = args.path;
			const deps = getDepFiles([ROOT_CLASS], [".view.tree"]);
			let isView = false
			if (!deps.length) {
				throw new Error("Deps not found");
			}
			ROOT_ID_TREE = deps[0].path;
			ROOT_ID = ROOT_ID_TREE;
			let files = getDepFiles([ROOT_CLASS], [".view.ts"]);
			if (files.length) {
				ROOT_ID = files[0].path;
				isView = true
			}
			return { path: ROOT_ID, pluginData :{ isRoot:true, isView} };
		});

		
		build.onLoad({ filter: /\.ts$/ }, async (args) => {
			let text = await fs.promises.readFile(args.path, "utf8");
			//console.log("PATH TS", args.path)
			let imports = addImports(text, args.path, false, args.pluginData?.isView)
			
			if(args.pluginData?.isView){
				const cur_mol_class = getClassFromPath(args.path)
				text = `;var ${cur_mol_class}_sfunc = function($b){ 
				if(this)
				this.$ = $b;

				${text}
				$b.${cur_mol_class} = ${cur_mol_class};
				}; ${cur_mol_class}_sfunc($);
				`
			}
			return {
				contents: imports + text,
				loader: "ts",
			};
		});

		build.onLoad({ filter: /\.view.tree$/}, async (args) => {
			let text = await fs.promises.readFile(args.path, "utf8");
			let result = treeToJs(text);
			//console.log(result.code)
			let imports = addImports(result.code, args.path, true, false)
			return {
				contents: imports + result.code + `//# sourceMappingURL=` + result.map,
				loader: "js",
			};
		});
	},
};
export { mamEsbuild };
