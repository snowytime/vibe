import { GenericError } from "@errors/index.js";
import { dev_logger } from "@logs/index.js";
import { Config } from "@type/globals.js";
import { devServer } from "../server/dev.js";

export const dev = async (config: Config) => {
	try {
		const { local, network, duration } = await devServer(config);
		dev_logger({ local, network, duration });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
