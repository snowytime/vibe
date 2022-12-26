import { GenericError } from "../../errors/index.js";
import { Config } from "../../index.js";
import { findConfig } from "../index.js";
import { resolveConfigs } from "./resolve.js";

export const getConfig = async (folderPath: string): Promise<Config> => {
	const [configPath] = await findConfig(folderPath);
	if (!configPath) {
		throw "Cannot get config without the .vibe folder";
	}
	try {
		const { default: config } = await import(configPath);
		return resolveConfigs(config);
	} catch (e) {
		if (e instanceof Error) {
			throw new GenericError(e);
		}
		throw e;
	}
};
