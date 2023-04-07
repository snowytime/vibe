import { build } from "vite";
import { join } from "node:path";
import { Config, BuildLog } from "#types/index.js";
import { getBase } from "./base.js";
import { findStories } from "../index.js";

interface Props {
    config: Config;
    startTime: number;
}

export async function buildServer({ config, startTime }: Props): Promise<BuildLog> {
    const destination = join(process.cwd(), config.outDir);
    try {
        const viteConfig = await getBase(
            {
                mode: "production",
                build: {
                    outDir: destination,
                    emptyOutDir: true,
                },
            },
            config,
        );
        await build(viteConfig);
    } catch (e) {
        console.log(e);
    }
    const stopTime = performance.now();
    const duration = stopTime - startTime;
    // get stories for logger
    const stories = await findStories(config);
    return {
        destination,
        duration,
        stories: stories.length,
    };
}
