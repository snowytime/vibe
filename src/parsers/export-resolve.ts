import { relative, resolve } from "node:path";
import { generateId } from "#helpers/id.js";
import { StoryData } from "../types/globals.js";
import { parseDefaultExport } from "./default.js";
import { parseNamedExports } from "./named.js";
import { prepare } from "./prepare.js";

const getPath = (filePath: string) => {
    const rootDir = resolve(process.cwd());
    const relativePath = relative(rootDir, filePath);
    return relativePath.replace(/\.(stories|tsx)/g, "");
};

export const exportResolve = async (paths: string[]): Promise<StoryData[]> => {
    const stories = [];
    for (const p of paths) {
        const ast = await prepare(p);
        const namedExports = parseNamedExports(ast);
        const defaultExport = parseDefaultExport(ast);
        namedExports.forEach((story) => {
            // resolve path
            const url = (defaultExport as any).path
                ? `${(defaultExport as any).path}/${story.name.replace(/ /g, "-")}`.toLowerCase()
                : `todo/${getPath(p)}/${story.name.replace(/ /g, "-")}`.toLowerCase();
            stories.push({
                ...defaultExport,
                id: generateId(url),
                url,
                filePath: p,
                ...story,
            });
        });
    }
    return stories;
};
