import { finder_debugger } from "@debug/index.js";
import { Config } from "@type/index.js";
import { join } from "node:path";
import { finder } from "./finder.js";

export const findEntry = async (config: Config) => {
	const folderPath = join(process.cwd(), ".vibe");
	const results = await finder(config.entry, folderPath);
	if (results.length) {
		finder_debugger("Custom entry found");
	}
	return results;
};
