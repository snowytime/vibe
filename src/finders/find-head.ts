import { finder_debugger } from "@debug/index.js";
import { join } from "node:path";
import { finder } from "./finder.js";

export const findHead = async () => {
	const folderPath = join(process.cwd(), ".vibe");
	const results = await finder("head.html", folderPath);
	if (results.length) {
		finder_debugger("Custom head.html found");
	}
	return results;
};
