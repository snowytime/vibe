import { performance } from "node:perf_hooks";
import fs from "node:fs";
import path from "node:path";

import { GenericError } from "#errors/index.js";
import { createLogger } from "#logs/index.js";

async function isExists(filePath: string) {
    try {
        await fs.promises.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function writeFile(filePath: string, data: string) {
    try {
        const dirname = path.dirname(filePath);
        const exist = await isExists(dirname);
        if (exist) return true;
        await fs.promises.mkdir(dirname, { recursive: true });
        await fs.promises.writeFile(filePath, data, "utf8");
        return false;
    } catch (err) {
        throw new Error(err);
    }
}

export const create = async () => {
    try {
        const startTime = performance.now();
        const destination = process.cwd();

        // we wanna set up the correct files
        const exists = await writeFile(
            path.join(destination, ".vibe/vibe.config.mjs"),
            "export default {};",
        );

        // stop the timer
        const stopTime = performance.now();
        const duration = stopTime - startTime;
        createLogger({ duration, destination, exists });
    } catch (e) {
        if (e instanceof Error) throw new GenericError(e);
        throw e;
    }
};
