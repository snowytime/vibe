import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";

export const findConfig = async () => {
    const folderPath = join(process.cwd(), ".vibe");
    const pattern = "vibe.config.mjs";
    const results = await globby(pattern, {
        cwd: folderPath,
    });
    if (results.length) {
        finderDebugger("Vibe config found");
        return join(folderPath, results[0]);
    }
    return null;
};
