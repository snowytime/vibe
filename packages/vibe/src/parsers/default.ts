// extracting the default export from the generated ast

import { ExportDefaultExpression, ModuleItem, ObjectExpression } from "@swc/core";
import { parseObject } from "./helpers/object.js";

export const parseDefaultExport = (ast: ModuleItem[] | undefined) => {
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
    if (result.hasOwnProperty("decorator")) {
        delete (result as any).decorator;
    }
    return { ...result };
};
