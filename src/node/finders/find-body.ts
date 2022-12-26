import { finder_debugger } from "../../debug/index.js";
import { finder } from "./finder.js";

export const findBody = async (folderPath: string) => {
	const results = await finder(["before.html", "after.html"], folderPath);
	if (results.length) {
		results.forEach((result) => {
			if (result.split("/").at(-1)?.includes("before")) {
				finder_debugger("Before body html found");
			}
			if (result.split("/").at(-1)?.includes("after")) {
				finder_debugger("After body html found");
			}
		});
	}
	return results;
};
