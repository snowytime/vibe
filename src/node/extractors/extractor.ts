import { pathToFileURL } from "node:url";
import { dynamicImport } from "../helpers/dynamic-import.js";
import { isEsm } from "../helpers/is-esm.js";
import { bundler } from "./bundler.js";
import fs from "node:fs";
import { extname } from "node:path";
import { dynamicRequire } from "../helpers/dynamic-require.js";

export const extractor = async (filepath: string): Promise<any> => {
	const esm = isEsm(filepath);
	const output = await bundler(filepath, esm);
	if (esm) {
		// specific for only when we are dealing with bundled things
		const fileBase = `${filepath}.timestamp-${Date.now()}`;
		const fileNameTmp = `${fileBase}.mjs`;
		const fileUrl = `${pathToFileURL(fileBase)}.mjs`;
		await fs.promises.writeFile(fileNameTmp, output);
		try {
			return await dynamicImport(fileUrl);
		} finally {
			try {
				fs.unlinkSync(fileNameTmp);
			} catch {
				// already removed if this function is called twice simultaneously
			}
		}
	} else {
		// commonjs limited support
		const extension = extname(filepath);
		const realFileName = fs.realpathSync(filepath);
		const loaderExt =
			extension in dynamicRequire.extensions ? extension : ".js";
		const defaultLoader = dynamicRequire.extensions[loaderExt]!;
		dynamicRequire.extensions[loaderExt] = (
			module: NodeModule,
			filename: string
		) => {
			if (filename === realFileName) {
				(module as any)._compile(output, filepath);
			} else {
				defaultLoader(module, filepath);
			}
		};
		// clear cache in case of server restart
		delete dynamicRequire.cache[dynamicRequire.resolve(filepath)];
		const raw = dynamicRequire(filepath);
		dynamicRequire.extensions[loaderExt] = defaultLoader;
		return raw.__esModule ? raw.default : raw;
	}
};
