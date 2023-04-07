import { performance } from "node:perf_hooks";
import { getConfig } from "#config/extract.js";
import { buildServer } from "#server/build.js";
import { buildLog } from "#log/index.js";

export const build = async () => {
    const startTime = performance.now();
    const config = await getConfig();
    const { destination, stories, duration } = await buildServer({
        config,
        startTime,
    });
    buildLog({ destination, stories, duration });
};
