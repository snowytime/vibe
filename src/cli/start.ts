import { getConfig } from "@config/index.js";
import { GenericError } from "@errors/index.js";
import { findFolder } from "@finders/index.js";

export const start = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { local, network } = await config.addon.start();
		// start_logger({ local, network });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
