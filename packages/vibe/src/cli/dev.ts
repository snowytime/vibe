import { performance } from "node:perf_hooks";
import { getConfig } from "#config/extract.js";
import { devServer } from "#server/dev.js";
import { devLog } from "#log/dev.js";

export const dev = async () => {
    const startTime = performance.now();
    const config = await getConfig();
    const { local, network, stories, duration } = await devServer({
        config,
        startTime,
    });
    devLog({ local, network, stories, duration });
};
