import { getConfig } from "@config/get-config.js";
import { findFolder } from "@finders/find-folder.js";

export const generateConfigImport = async () => {
	const [folder] = await findFolder();
	const config = await getConfig(folder);
	let configCode = `export let config = {};\n`;
	if (config) {
		configCode += `config = ${JSON.stringify(config)}`;
	}
	return `${configCode}`;
};
