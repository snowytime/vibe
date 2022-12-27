import glob from "glob";
import { join } from "node:path";
import { finder_debugger } from "@debug/index.js";
import { FinderError } from "@errors/index.js";

export const finder = async (
	pattern: string | string[],
	directory = process.cwd()
): Promise<string[]> => {
	const patternToConvert = Array.isArray(pattern)
		? pattern.length > 1
			? `*(${pattern.join("|")})`
			: pattern[0]
		: pattern;
	finder_debugger(`Searching for: ${patternToConvert}`);
	try {
		return await new Promise((resolve, reject) => {
			glob(
				patternToConvert,
				{ cwd: directory, dot: true },
				(err, files: string[]) => {
					if (err) reject(err);
					resolve(files.map((file) => join(directory, file)));
				}
			);
		});
	} catch (e) {
		if (e instanceof Error) {
			throw new FinderError(e);
		}
		throw e;
	}
};
