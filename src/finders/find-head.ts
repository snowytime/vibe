import { finderDebugger } from "#debug/index.js";
import { globby } from "globby";
import { join } from "node:path";

export const findHead = async () => {
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
};
