// import { getInitialData } from "../data/index.js";

import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";
import { create_logger } from "@logs/index.js";

export const create = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { duration, destination } = await config.addon.create();
		create_logger({ duration, destination });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
