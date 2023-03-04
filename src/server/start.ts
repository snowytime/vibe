import getPort from "get-port";
import os from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { preview } from "vite";
import { Config } from "#type/globals.js";
import { getBase } from "./base.js";

// note that this server does not respond to local changes
export const startProduction = async (config: Config) => {
    // start with the initial setup
    const startTime = performance.now();
    const destination = join(process.cwd(), config.out);
    const configPorts = Array.isArray(config.preview) ? config.preview : [config.preview];
    const port = await getPort({
        port: [configPorts, 61001, 62002, 62003, 62004, 62005].flat(),
    });

    // server specific things
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
        const networkUrl = config.expose
            ? `${vite.config.preview.https ? "https" : "http"}://${
                  os.networkInterfaces().en0[1].address
              }:${port}${vite.config.base || ""}`
            : null;

        const stopTime = performance.now();
        const duration = stopTime - startTime;
        return {
            local: localUrl,
            network: networkUrl,
            duration,
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
};
