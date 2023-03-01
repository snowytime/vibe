import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isBuiltin } from "../helpers/is-built-in.js";

export const bundler = async (filepath: string, isEsm: boolean) => {
    const dirnameVarName = "__visby_injected_original_dirname";
    const filenameVarName = "__visby_injected_original_filename";
    const importMetaUrlVarName = "__visby_injected_original_import_meta_url";
    const result = await build({
        absWorkingDir: process.cwd(),
        entryPoints: [filepath],
        outfile: "out.js",
        write: false,
        target: ["node14.18", "node16"],
        platform: "node",
        bundle: true,
        format: isEsm ? "esm" : "cjs",
        mainFields: ["main"],
        sourcemap: "inline",
        metafile: true,
        define: {
            __dirname: dirnameVarName,
            __filename: filenameVarName,
            "import.meta.url": importMetaUrlVarName,
        },
        plugins: [
            {
                name: "externalize-deps",
                setup(build) {
                    // externalize bare imports
                    build.onResolve({ filter: /^[^.].*/ }, async ({ path: id, importer, kind }) => {
                        if (kind === "entry-point" || path.isAbsolute(id) || isBuiltin(id)) {
                            return;
                        }

                        // partial deno support as `npm:` does not work with esbuild
                        if (id.startsWith("npm:")) {
                            return { external: true };
                        }
                        return {
                            path: "",
                            external: true,
                        };
                    });
                },
            },
            {
                name: "inject-file-scope-variables",
                setup(build) {
                    build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
                        const contents = await fs.promises.readFile(args.path, "utf8");
                        const injectValues =
                            `const ${dirnameVarName} = ${JSON.stringify(
                                path.dirname(args.path),
                            )};` +
                            `const ${filenameVarName} = ${JSON.stringify(args.path)};` +
                            `const ${importMetaUrlVarName} = ${JSON.stringify(
                                pathToFileURL(args.path).href,
                            )};`;

                        return {
                            loader: args.path.endsWith("ts") ? "ts" : "js",
                            contents: injectValues + contents,
                        };
                    });
                },
            },
        ],
    });
    const { text } = result.outputFiles[0];
    return text;
};
