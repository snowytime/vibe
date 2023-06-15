import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { FinderError } from "#helpers/error.js";

export const findAddons = async () => {
    try {
        const folderPath = join(process.cwd(), ".vibe");
        const pattern = "addons.{js,ts,mjs}";
        const results = await globby(pattern, {
            cwd: folderPath,
        });
        if (results.length) {
            finderDebugger("addons file found");
            return join(folderPath, results[0]);
        }
        return null;
    } catch (error) {
        throw new FinderError({
            message: "Error finding addons",
        });
    }
};
