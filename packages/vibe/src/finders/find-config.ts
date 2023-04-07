import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { FinderError } from "../index.js";

export const findConfig = async () => {
    try {
        const folderPath = join(process.cwd(), ".vibe");
        const pattern = "vibe.config.{js,ts}";
        const results = await globby(pattern, {
            cwd: folderPath,
        });
        if (results.length) {
            finderDebugger("Vibe config found");
            return join(folderPath, results[0]);
        }
        return null;
    } catch (error) {
        throw new FinderError({
            message: "Error finding Vibe config",
        });
    }
};
