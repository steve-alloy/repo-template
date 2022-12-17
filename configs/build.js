import { build } from "esbuild";

// Imports for bundling JS
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// Imports for bundling CSS
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";

// Custom plugins
import esbuildHTML from "./plugins/esbuild-html.js";
import esbuildImages from "./plugins/esbuild-images.js";

const watch = process.argv.includes("--watch");

// Build client
build({
	"entryPoints": ["./web/src/main.js"],
	"bundle": true,
	"minify": true,
	"treeShaking": true,
	"outfile": "build/build.js",
	"watch": watch,
	"sourcemap": true,
	"platform": "browser",
	"logLevel": "info",
	"plugins": [
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([
					purgecss({
						"content": [
							"./web/public/index.html",
							"./web/src/App.svelte",
							"./web/src/**/*.svelte"
						]
					}),
					autoprefixer,
					postcssPresetEnv({
						"stage": 1
					})
				]).process(source, { "from": undefined });
				return css;
			}
		}),
		esbuildSvelte({
			"preprocess": sveltePreprocess()
		}),
		esbuildHTML,
		esbuildImages
	]
}).catch(() => process.exit(1));

export default watch;
