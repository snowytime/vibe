import { Config } from "#type/index.js";

export const baseConfig: Omit<Config, "addon"> = {
    port: [5173, 5174, 5175, 5176, 5177, 5178],
    preview: [3001, 3002, 3003, 3004, 3005, 3006],
    defaultStory: null,
    stories: "**/*.stories.{ts,tsx,js,jsx,mjs}",
    out: "visby-build",
    entry: "Entry.{js,ts,tsx,jsx}",
    expose: false,
    website: "https://snowy.sh/vibe",
    repo: "https://github.com/snowytime/vibe",
    project: "vibe",
    version: "1",
    mode: "development",
};
