import { performance } from "node:perf_hooks";
import { getConfig } from "#config/extract.js";
import { previewServer } from "#server/preview.js";
import { previewLog } from "../index.js";

export const preview = async () => {
    const startTime = performance.now();
    const config = await getConfig();
    const { local, network, stories, duration } = await previewServer({
        config,
        startTime,
    });
    previewLog({ local, network, stories, duration });
};
