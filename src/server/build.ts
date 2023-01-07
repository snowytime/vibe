import { performance } from "node:perf_hooks";
import { getBase } from "./base.js";
import { build } from "vite";
import { join } from "node:path";
import { Config } from "@type/globals.js";
import { findVite } from "@finders/find-vite.js";

export const buildProduction = async (config: Config) => {
    const startTime = performance.now();
    const destination = join(process.cwd(), config.out);
    const vitePath = await findVite();
    try {
        const viteConfig = await getBase(
            {
                mode: "production",
                build: {
                    outDir: destination,
                    emptyOutDir: true,
                },
            },
            vitePath,
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
