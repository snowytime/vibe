// import { getInitialData } from "../data/index.js";

import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";
import { build_logger } from "@logs/index.js";
import { buildProduction } from "../server/build.js";

export const build = async () => {
	try {
		await buildProduction();
		// build_logger({ duration, destination, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
