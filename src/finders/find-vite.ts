import { finder } from "./finder.js";
import { finder_debugger } from "@debug/index.js";

export const findVite = async (folderPath: string) => {
	const results = await finder("vite.config.{ts,js.mjs}", folderPath);
	if (results.length) {
		finder_debugger("Custom vite config found");
	}
	return results;
};
