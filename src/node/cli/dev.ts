import { GenericError } from "@errors/index.js";
import { getVibeData } from "../index.js";

export const dev = async () => {
	try {
		const data = await getVibeData();
		console.log(data);
		// const [folder] = await findFolder();
		// const config = await getConfig(folder);
		// const { local, network } = await config.addon.dev();
		// main_logger({ local, network });
	} catch (e) {
		console.log(e);
		throw new GenericError({ message: "Unable to parse for stories" });
	}
};
