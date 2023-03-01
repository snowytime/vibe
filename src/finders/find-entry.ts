import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { Config } from "#type/index.js";

export const findEntry = async (config: Config) => {
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
};
