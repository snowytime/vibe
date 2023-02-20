import { finderDebugger } from "#debug/index.js";
import { Config } from "#type/index.js";
import { globby } from "globby";
import { join } from "node:path";

export const findStories = async (config: Config) => {
    const results = await globby(config.stories);
    if (results.length) {
        finderDebugger(`Soured ${results.length} stories`);
    }
    return results.map((story) => join(process.cwd(), story));
};
