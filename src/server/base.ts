import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";
import reactPlugin from "@vitejs/plugin-react";
import vibePlugin from "../plugin/vibe-plugin.js";
import { Config } from "#type/globals.js";

export const getBase = async (configUpdate: any, userConfig: Config) => {
    // get the user configuration.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = dirname(__filename);
    // note that we NEED the tsconfigPaths and react plugins to be present.
    // the user may supply their own custom vite config that will be applied as well during dev, build, and start phases
    const config = {
        ...configUpdate,
        // we might support custom base in config at some point
        base: undefined,
        configFile: false,
        publicDir: join(process.cwd(), "public"),
        root: join(__dirname, "../../app/"),
        css: {
            postcss: process.cwd(),
        },
        envDir: process.cwd(),
        resolve: {},
        optimizeDeps: {
            include: [
                "react",
                "react-dom",
                "react-dom/client",
                // "@snowytime/vibe",
                // "@snowytime/react-hooks",
                // "@snowytime/iconly-react/ui",
                "sass",
                "react-router-dom",
            ],
            exclude: ["@swc/wasm", "@swc/core", "fsevents", "virtual:vibe"],
        },
        plugins: [
            tsconfigPaths({
                root: process.cwd(),
            }),
            vibePlugin(userConfig),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            reactPlugin(),
        ],
    };
    return config;
};
