import { preview } from "vite";
import getPort from "get-port";
import os from "node:os";
import { join } from "node:path";
import { getBase } from "./base.js";
import { Config, Log } from "#types/index.js";
import { findStories } from "../index.js";

interface Props {
    config: Config;
    startTime: number;
}

export async function previewServer({ config, startTime }: Props): Promise<Log> {
    const destination = join(process.cwd(), config.outDir);
    const configPorts = Array.isArray(config.previewPort)
        ? config.previewPort
        : [config.previewPort];
    const port = await getPort({
        port: [configPorts, 61001, 62002, 62003, 62004, 62005].flat(),
    });
    try {
        const viteConfig = await getBase(
            {
                mode: "production",
                build: {
                    outDir: destination,
                    emptyOutDir: true,
                },
                preview: {
                    port,
                },
            },
            config,
        );

        // final arguments
        const vite = await preview(viteConfig);
        // urls
        const localUrl = `${vite.config.server.https ? "https" : "http"}://localhost:${port}${
            vite.config.base || ""
        }`;
        // const networkUrl = config.expose
        //     ? `${vite.config.preview.https ? "https" : "http"}://${
        //           os.networkInterfaces().en0[1].address
        //       }:${port}${vite.config.base || ""}`
        //     : null;

        const stopTime = performance.now();
        const duration = stopTime - startTime;
        // get story count for logger
        const stories = await findStories(config);
        return {
            local: localUrl,
            network: "",
            duration,
            stories: stories.length,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
