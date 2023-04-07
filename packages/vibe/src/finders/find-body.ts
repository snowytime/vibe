import { globby } from "globby";
import { join } from "node:path";
import { finderDebugger } from "#debug/index.js";
import { FinderError } from "#helpers/error.js";

export const findBody = async () => {
    try {
        const folderPath = join(process.cwd(), ".vibe");
        const results = await globby(["before.html", "after.html"], {
            cwd: join(process.cwd(), ".vibe"),
        });
        if (results.length) {
            results.forEach((result) => {
                if (result.split("/").at(-1)?.includes("before")) {
                    finderDebugger("Before body html found");
                }
                if (result.split("/").at(-1)?.includes("after")) {
                    finderDebugger("After body html found");
                }
            });
            return results.map((r) => join(folderPath, r));
        }
        return null;
    } catch (error) {
        throw new FinderError({
            message: "Error finding body",
        });
    }
};
