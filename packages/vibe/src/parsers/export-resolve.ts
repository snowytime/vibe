import { generateId } from "#helpers/id.js";
import { Story } from "#types/index.js";
import { getPath } from "#helpers/get-path.js";
import { parseDefaultExport } from "./default.js";
import { parseNamedExports } from "./named.js";
import { prepare } from "./prepare.js";

export const exportResolve = async (paths: string[]): Promise<Story[]> => {
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
                ...story,
                url,
                filePath: p,
            });
        });
    }
    return stories;
};
