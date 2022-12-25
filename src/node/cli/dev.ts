import { getVibeData } from "../index.js";

export const dev = async () => {
	try {
		// const data = await getInitialData();
		// const { local, network } = await data.config.addon.dev(data);
		// log.dev(local, network);
		const data = await getVibeData();
		console.log(data);
	} catch (e) {
		console.log(e);
		// handles error from the addon
		// log.error(e)
	}
};
