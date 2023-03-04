import { performance } from "node:perf_hooks";
import { build } from "vite";
import { join } from "node:path";
import { getBase } from "./base.js";
import { Config } from "#type/globals.js";

export const buildProduction = async (config: Config) => {
    const startTime = performance.now();
    const destination = join(process.cwd(), config.out);
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
    return {
        destination,
        duration,
    };
};
