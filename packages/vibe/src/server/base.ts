import tsconfigPaths from "vite-tsconfig-paths";
import reactPlugin from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Config } from "#types/index.js";
import vibePlugin from "#plugin/plugin.js";
import cssPlugin from "./css.js";

type Settings = {
    mode: string;
    server?: {
        host: boolean;
        port: number;
        hmr: {
            port: number;
            overlay: boolean;
        };
        fs: {
            strict: boolean;
        };
        middlewareMode: boolean;
    };
    build?: {
        outDir: string;
        emptyOutDir: boolean;
    };
    preview?: {
        port: number;
    };
};

export async function getBase(settings: Settings, config: Config) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    return {
        ...settings,
        // we might support custom base in config at some point
        base: undefined,
        cache: false,
        // configFile: false,
        publicDir: join(process.cwd(), "public"),
        root: join(__dirname, "../../app/"),
        css: {
            postcss: process.cwd(),
        },
        envDir: process.cwd(),
        resolve: {},
        optimizeDeps: {
            include: [
                // "react",
                // "react-dom",
                // "react-dom/client",
                // "react-frame-component",
                // "@snowytime/react-magic",
                // "sass",
                // "react-router-dom",
            ],
            exclude: [],
        },
        plugins: [
            tsconfigPaths({
                root: process.cwd(),
            }),
            { enforce: "pre" as any, ...mdx() },
            vibePlugin(config),
            reactPlugin(),
            { enforce: "pre" as any, ...cssPlugin(config.outDir, settings.mode) },
        ],
    };
}
