import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { Config } from "#types/index.js";
import { FinderError } from "../index.js";

export const findDocs = async (config: Config) => {
    try {
        const results = await globby(config.docs, {
            dot: true,
        });
        if (results.length) {
            finderDebugger(`Found ${results.length} docs`);
        }
        return results.map((doc) => join(process.cwd(), doc));
    } catch (error) {
        throw new FinderError({
            message: "Error finding docs",
        });
    }
};
