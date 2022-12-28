import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";
import { start_logger } from "@logs/index.js";

export const start = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { local, network, duration } = await config.addon.start();
		start_logger({ local, network, duration });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
