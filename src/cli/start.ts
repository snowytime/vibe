import { GenericError } from "#errors/index.js";
import { startLogger } from "#logs/index.js";
import { Config } from "#type/globals.js";
import { startProduction } from "../server/start.js";

export const start = async (config: Config) => {
    try {
        const { local, network, duration } = await startProduction(config);
        startLogger({ local, network, duration });
    } catch (e) {
        if (e instanceof Error) throw new GenericError(e);
        throw e;
    }
};
