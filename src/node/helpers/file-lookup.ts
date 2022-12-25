import { join, dirname } from "node:path";
import fs from "node:fs";

interface LookupFileOptions {
	pathOnly?: boolean;
	rootDir?: string;
	predicate?: (file: string) => boolean;
}

export function lookupFile(
	dir: string,
	formats: string[],
	options?: LookupFileOptions
): string | undefined {
	for (const format of formats) {
		const fullPath = join(dir, format);
		if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
			const result = options?.pathOnly
				? fullPath
				: fs.readFileSync(fullPath, "utf-8");
			if (!options?.predicate || options.predicate(result)) {
				return result;
			}
		}
	}
	const parentDir = dirname(dir);
	if (
		parentDir !== dir &&
		(!options?.rootDir || parentDir.startsWith(options?.rootDir))
	) {
		return lookupFile(parentDir, formats, options);
	}
}
