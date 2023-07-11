import express from "express";
// import os from "node:os";
import { createServer } from "vite";
import chokidar from "chokidar";
import getPort from "get-port";
import { Config, Log } from "#types/index.js";
import { getBase } from "./base.js";
import { findStories } from "#finders/index.js";
import { exportResolve } from "../parsers/export-resolve.js";
import { getJson } from "#structures/meta.js";

interface Props {
    config: Config;
    startTime: number;
}

export async function devServer({ config, startTime }: Props): Promise<Log> {
    const app = express();
    const configPorts = Array.isArray(config.devPort) ? config.devPort : [config.devPort];
    const port = await getPort({
        port: [configPorts, 61001, 62002, 62003, 62004, 62005].flat(),
    });
    const hmrPort = await getPort({
        port: [24678, 24679, 24680, 24681, 24682, 24683, 24684, 24685],
    });

    try {
        const viteConfig = await getBase(
            {
                mode: "development",
                server: {
                    host: !!config.expose,
                    port,
                    hmr: {
                        port: hmrPort,
                        overlay: false,
                    },
                    fs: {
                        strict: false,
                    },
                    middlewareMode: true,
                },
            },
            config,
        );
        const vite = await createServer(viteConfig);
        const { moduleGraph, ws } = vite;

        app.head("*", async (_, res) => res.sendStatus(200));
        app.get("/meta.json", async (_, res) => {
            const stories = await findStories(config);
            const storyData = await exportResolve(stories);
            const jsonData = getJson(storyData, config);
            res.send(JSON.stringify(jsonData));
        });

        const { base } = viteConfig;
        if (base && base !== "/" && base !== "./") {
            app.get("/", (_, res) => res.redirect(base));
            app.get("/index.html", (_, res) => res.redirect(base));
        }

        app.use(vite.middlewares);
        // handle the urls
        const localUrl = `${vite.config.server.https ? "https" : "http"}://localhost:${port}${
            vite.config.base || ""
        }`;
        // const networkUrl = config.expose
        //     ? `${vite.config.server.https ? "https" : "http"}://${
        //           os.networkInterfaces().en0[1].address
        //       }:${port}${vite.config.base || ""}`
        //     : null;
        app.listen(port);

        const watcher = chokidar.watch(config.stories, {
            persistent: true,
            ignoreInitial: true,
            ignored: [/node_modules/, /dist/, /build/, /out/],
        });
        let checkSum = "";
        let first = true;
        const getChecksum = async () => {
            try {
                const stories = await findStories(config);
                const storyData = await exportResolve(stories);
                const jsonData = getJson(storyData, config);
                return JSON.stringify(jsonData);
            } catch (e) {
                return checkSum;
            }
        };
        checkSum = await getChecksum();
        const invalidate = async () => {
            const newChecksum = await getChecksum();
            if (checkSum === newChecksum || !first) return;
            checkSum = newChecksum;
            first = false;
            const module = moduleGraph.getModuleById("\0virtual:vibe");
            if (module) {
                moduleGraph.invalidateModule(module);
                if (ws) {
                    ws.send({
                        type: "full-reload",
                        path: "*",
                    });
                }
            }
        };
        watcher.on("add", invalidate).on("unlink", invalidate).on("change", invalidate);
        // .on("change", invalidate);
        const stopTime = performance.now();
        const duration = stopTime - startTime;
        // get story count
        const stories = await findStories(config);
        return {
            local: localUrl,
            network: "tbd",
            duration,
            stories: stories.length,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
