import { astConverter } from "./base.js";
import { extractDefaultExport } from "./default.js";
import { extractNamedExports } from "./named.js";
import { extractStorynameMeta } from "./storyname-meta.js";

export const generator = async (path: string) => {
	const ast = await astConverter(path);
	const familyData = extractDefaultExport(ast);
	const storyData = extractNamedExports(ast, familyData, path);
	extractStorynameMeta(storyData, ast, familyData);
	return storyData;
};
