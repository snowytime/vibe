// import { getInitialData } from "../data/index.js";

import { GenericError } from "@errors/index.js";
import { Config } from "@type/globals.js";
import { buildProduction } from "../server/build.js";

export const build = async (config: Config) => {
	try {
		await buildProduction(config);
		// build_logger({ duration, destination, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
