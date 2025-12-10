import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.js"],
	format: ["esm", "cjs"],
	splitting: false,
	sourcemap: true,
	clean: true,
	outDir: "dist",
	target: "es2020",
	dts: false,
	minify: false
});
