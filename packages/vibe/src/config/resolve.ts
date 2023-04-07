import { baseConfig } from "./base.js";
import { Config } from "#types/index.js";

export const resolveConfigs = (config: Partial<Config>): Config => {
    return {
        ...baseConfig,
        ...config,
    };
};
