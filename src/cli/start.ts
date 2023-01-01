import { GenericError } from "@errors/index.js";
import { start_logger } from "@logs/index.js";
import { startProduction } from "../server/start.js";

export const start = async () => {
	try {
		await startProduction();
		// start_logger({ local, network, duration, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
