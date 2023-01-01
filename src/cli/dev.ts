import { GenericError } from "@errors/index.js";
import { dev_logger } from "@logs/index.js";
import { devServer } from "../server/dev.js";

export const dev = async () => {
	try {
		const { local, network, duration, stories } = await devServer();
		dev_logger({ local, network, duration, stories });
	} catch (e) {
		if (e instanceof Error) throw new GenericError(e);
		throw e;
	}
};
