import { finderDebugger } from "#debug/index.js";
import { join } from "node:path";
import { globby } from "globby";

export const findVite = async (): Promise<string | null> => {
    const folderPath = join(process.cwd(), ".vibe");
    const pattern = "vite.config.{ts,js,mjs}";
    const results = await globby(pattern, {
        cwd: folderPath,
    });
    if (results.length) {
        finderDebugger("Custom vite config found");
        return join(folderPath, results[0]);
    }
    return null;
};
