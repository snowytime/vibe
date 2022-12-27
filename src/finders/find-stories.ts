import { finder_debugger } from "@debug/index.js";
import { Config } from "@type/index.js";
import { finder } from "./finder.js";

export const findStories = async (config: Config) => {
	const results = await finder(config.stories);
	if (results.length) {
		finder_debugger(`Soured ${results.length} stories`);
	}
	return results;
};
