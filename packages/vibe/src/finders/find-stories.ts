import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { Config } from "#types/index.js";
import { FinderError } from "../index.js";

export const findStories = async (config: Config) => {
    try {
        const results = await globby(config.stories, {
            dot: true,
        });
        if (results.length) {
            finderDebugger(`Found ${results.length} stories`);
        }
        return results.map((story) => join(process.cwd(), story));
    } catch (error) {
        throw new FinderError({
            message: "Error finding stories",
        });
    }
};
