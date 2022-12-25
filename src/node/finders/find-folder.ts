import { finder_debugger } from "@debug/index.js";
import { finder } from "./finder.js";

export const findFolder = async () => {
	const vibePattern = ".vibe";
	const results = await finder(vibePattern);
	if (results.length) {
		finder_debugger("Vibe folder found");
	}
	return results;
};
