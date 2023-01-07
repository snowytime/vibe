// import { getInitialData } from "../data/index.js";

import { GenericError } from "@errors/index.js";
import { buildLogger } from "@logs/index.js";
import { Config } from "@type/globals.js";
import { buildProduction } from "../server/build.js";

export const build = async (config: Config) => {
    try {
        const { destination, duration } = await buildProduction(config);
        buildLogger({ duration, destination });
    } catch (e) {
        if (e instanceof Error) throw new GenericError(e);
        throw e;
    }
};
