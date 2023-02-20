import { Config } from "#type/index.js";
import { baseConfig } from "./base.js";

export const resolveConfigs = (config: Config): Config => {
	return { ...baseConfig, ...config };
};
