import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { Config } from "#types/index.js";
import { FinderError } from "#helpers/error.js";

export const findEntry = async (config: Config) => {
    try {
        const folderPath = join(process.cwd(), ".vibe");
        const results = await globby(config.entry, {
            cwd: folderPath,
        });
        if (results.length) {
            // fix the path and forward
            finderDebugger("Entry found");
            return join(folderPath, results[0]);
        }
        return null;
    } catch (error) {
        throw new FinderError({
            message: "Error finding entry",
        });
    }
};
