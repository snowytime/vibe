import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { FinderError } from "#helpers/error.js";

export const findHead = async () => {
    try {
        const folderPath = join(process.cwd(), ".vibe");
        const pattern = "head.html";
        const results = await globby(pattern, {
            cwd: folderPath,
        });
        if (results.length) {
            finderDebugger("Head html found");
            return join(folderPath, results[0]);
        }
        return null;
    } catch (error) {
        throw new FinderError({
            message: "Error finding head",
        });
    }
};
