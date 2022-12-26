import { finder_debugger } from "../../debug/index.js";
import { finder } from "./finder.js";

export const findHead = async (folderPath: string) => {
	const results = await finder("head.html", folderPath);
	if (results.length) {
		finder_debugger("Custom head.html found");
	}
	return results;
};
