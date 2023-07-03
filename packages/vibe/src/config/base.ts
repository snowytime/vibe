import { Config } from "../types/index.js";

export const baseConfig: Config = {
    devPort: [5173, 5174, 5175, 5176, 5177, 5178],
    previewPort: [3001, 3002, 3003, 3004, 3005, 3006],
    defaultStory: null,
    stories: "**/*.stories.{ts,tsx,js,jsx,mjs}",
    docs: "**/*.{doc,docs}.mdx",
    outDir: "vibe-build",
    entry: "[Ee]ntry.{js,ts,tsx,jsx}",
    expose: true,
    website: "https://snowy.sh/vibe",
    repo: "",
    project: "vibe",
    version: "1",
    mode: "development",
    addons: [],
};
