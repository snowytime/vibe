import { finder_debugger } from "@debug/index.js";
import { Config } from "@type/globals.js";
import { finder } from "./finder.js";

export const findEntry = async (config: Config, folderPath: string) => {
	const results = await finder(config.entry, folderPath);
	if (results.length) {
		finder_debugger("Custom entry found");
	}
	return results;
};
