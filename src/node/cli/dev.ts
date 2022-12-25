import { GenericError } from "@errors/index.js";
import { findFolder, findStories, getConfig, getVibeData } from "../index.js";

export const dev = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const stories = await findStories(config);
		// const data = await getVibeData();
		console.log({ config, stories });
		// const [folder] = await findFolder();
		// const config = await getConfig(folder);
		// const { local, network } = await config.addon.dev();
		// main_logger({ local, network });
	} catch (e) {
		console.log(e);
		throw new GenericError({ message: "Unable to parse for stories" });
	}
};
