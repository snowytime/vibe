import { GenericError } from "@errors/index.js";
import { create_logger } from "@logs/index.js";

import { performance } from "node:perf_hooks";
import fs from "node:fs";
import path from "node:path";

async function isExists(path: string) {
	try {
		await fs.promises.access(path);
		return true;
	} catch {
		return false;
	}
}

async function writeFile(filePath: string, data: string) {
	try {
		const dirname = path.dirname(filePath);
		const exist = await isExists(dirname);
		if (!exist) {
			await fs.promises.mkdir(dirname, { recursive: true });
		}

		await fs.promises.writeFile(filePath, data, "utf8");
	} catch (err) {
		throw new Error(err);
	}
}

export const create = async () => {
	try {
		const startTime = performance.now();
		const destination = process.cwd();

		// we wanna set up the correct files
		try {
			await writeFile(
				path.join(destination, ".vibe/vibe.config.mjs"),
				"export default {};"
			);
		} catch (e) {
			console.log(e);
			throw e;
		}

		// stop the timer
		const stopTime = performance.now();
		const duration = stopTime - startTime;
		create_logger({ duration, destination });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
