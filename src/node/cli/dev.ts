import { main_logger } from "@logs/index.js";
import { findFolder, getConfig } from "../index.js";

export const dev = async () => {
	try {
		const [folder] = await findFolder();
		const config = await getConfig(folder);
		const { local, network } = await config.addon.dev();
		main_logger({ local, network });
	} catch (e) {
		console.log(e);
	}
};
