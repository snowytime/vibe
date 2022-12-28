// import { getInitialData } from "../data/index.js";

import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";
import { build_logger } from "@logs/index.js";

export const build = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { duration, destination, stories } = await config.addon.build();
		build_logger({ duration, destination, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
