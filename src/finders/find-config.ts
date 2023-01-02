import { finder_debugger } from "@debug/index.js";
import { join } from "node:path";
import { finder } from "./finder.js";

export const findConfig = async () => {
	const folderPath = join(process.cwd(), ".vibe");
	const vibePattern = "vibe.config.mjs";
	const results = await finder(vibePattern, folderPath);
	if (results.length) {
		finder_debugger("Vibe config found");
	}
	return results;
};
