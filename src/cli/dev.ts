import { GenericError } from "#errors/index.js";
import { devLogger } from "#logs/index.js";
import { Config } from "#type/globals.js";
import { devServer } from "../server/dev.js";

export const dev = async (config: Config) => {
    try {
        const { local, network, duration } = await devServer(config);
        devLogger({ local, network, duration });
    } catch (e) {
        if (e instanceof Error) throw new GenericError(e);
        throw e;
    }
};
