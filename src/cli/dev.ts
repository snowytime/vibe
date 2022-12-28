import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";
import { dev_logger } from "@logs/index.js";

export const dev = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { local, network, duration, stories } = await config.addon.dev();
		dev_logger({ local, network, duration, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
