import { GenericError } from "@errors/index.js";
import { start_logger } from "@logs/index.js";
import { Config } from "@type/globals.js";
import { startProduction } from "../server/start.js";

export const start = async (config: Config) => {
	try {
		await startProduction(config);
		// start_logger({ local, network, duration, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
