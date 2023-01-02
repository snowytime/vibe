import { finder } from "./finder.js";
import { finder_debugger } from "@debug/index.js";
import { join } from "node:path";

export const findVite = async () => {
	const folderPath = join(process.cwd(), ".vibe");
	const results = await finder("vite.config.{ts,js.mjs}", folderPath);
	if (results.length) {
		finder_debugger("Custom vite config found");
	}
	return results;
};
