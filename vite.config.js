import mamPlugin from "./vite-plugin-mam";
import { defineConfig } from "vite";
import timeReporter from "vite-plugin-time-reporter";
export default defineConfig({
	
	resolve: {
		//extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json','.tree']
	},
	plugins: [{ ...mamPlugin() }, timeReporter()],
	esbuild: {
		minifyIdentifiers: false,
		keepNames: true,
	},
	build: {
		esbuild: {
			minifyIdentifiers: false,
			keepNames: true,
		},
		minify: false,
		rollupOptions: {
			shimMissingExports: false,
			treeshake: {},
			plugins: [],
			output: {},
		},
	},
});
