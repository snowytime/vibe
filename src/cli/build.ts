// import { getInitialData } from "../data/index.js";

import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";

export const build = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { status, duration, destination } = await config.addon.build();
		// build_logger({ local, network });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
