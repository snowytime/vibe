import { GenericError } from "#errors/index.js";
import { lookupFile } from "./file-lookup.js";

export const isEsm = (path: string) => {
	let isESM = false;
	if (/\.m[jt]s$/.test(path)) {
		isESM = true;
	} else if (/\.c[jt]s$/.test(path)) {
		isESM = false;
	} else {
		// check package.json for type: "module" and set `isESM` to true
		try {
			const pkg = lookupFile(path, ["package.json"]);
			isESM = !!pkg && JSON.parse(pkg).type === "module";
		} catch (e) {
			if (e instanceof Error) {
				throw new GenericError(e);
			}
			throw e;
		}
	}
	return isESM;
};
