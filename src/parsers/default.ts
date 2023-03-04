// extracting the default export from the generated ast

import { ExportDefaultExpression, ModuleItem, ObjectExpression } from "@swc/core";
import path from "node:path";
import { parseObject } from "./helpers/object.js";

const getPath = (filePath: string) => {
    const rootDir = path.resolve(process.cwd());
    const relativePath = path.relative(rootDir, filePath);
    return relativePath.replace(/\.(stories|tsx)/g, "");
};

export const parseDefaultExport = (ast: ModuleItem[] | undefined, p: string) => {
    const node = ast.find((node): node is ExportDefaultExpression => {
        return node.type === "ExportDefaultExpression";
    });
    if (!node) {
        return {};
    }

    const result = parseObject(node.expression as ObjectExpression);

    // default export may not override the story names
    if (result.hasOwnProperty("name")) {
        delete result.name;
    }
    return { ...result, familyName: getPath(p) };
};
