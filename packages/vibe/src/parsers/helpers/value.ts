import { ArrayExpression, Node, ObjectExpression } from "@swc/core";
import { parseArray } from "./array.js";
import { parseObject } from "./object.js";

export const parseValue = (valueNode: Node) => {
    if ("value" in valueNode) {
        switch (valueNode.type) {
            case "StringLiteral":
            case "BooleanLiteral":
            case "NumericLiteral":
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return valueNode.value;
            default: {
                return undefined;
            }
        }
    } else if (valueNode.type === "ObjectExpression") {
        return parseObject(valueNode as ObjectExpression);
    } else if (valueNode.type === "ArrayExpression") {
        return parseArray(valueNode as ArrayExpression);
    }
    // Add cases for other value node types if needed
    return undefined;
};
