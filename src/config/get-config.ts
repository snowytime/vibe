import { GenericError } from "#errors/index.js";
import { Config } from "#type/index.js";

import { extractor } from "../extractors/extractor.js";
import { findConfig } from "../index.js";
import { resolveConfigs } from "./resolve.js";

export const getConfig = async (): Promise<Config> => {
    const configPath = await findConfig();
    if (!configPath) {
        return resolveConfigs({} as Config);
    }
    try {
        const { default: config } = await extractor(configPath);
        return resolveConfigs(config);
    } catch (e) {
        if (e instanceof Error) {
            throw new GenericError(e);
        }
        throw e;
    }
};
