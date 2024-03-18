import * as esbuild from 'esbuild'
import { mamEsbuild } from './index.mjs'
import fs from 'node:fs'
import time from 'esbuild-plugin-time';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
const result = await esbuild.build({
  entryPoints: ['mam-esbuild/app.js'],
  bundle: true,
  outfile: 'mam-esbuild/out.js',
  plugins:[mamEsbuild, time(), esbuildPluginTsc({
  
	tsconfigPath:'/tsconfig.json',
    force: true,
  
})],
  tsconfig: '/tsconfig.json',
  minify: false,
  keepNames: true,
  //metafile: true,
  target:[
	//'es2020'
  ],
  format:'esm',
  //splitting: true,
  //outdir: 'mam-esbuild',
  //allowOverwrite:true
})
//fs.writeFileSync('./meta.json', JSON.stringify(result.metafile))
