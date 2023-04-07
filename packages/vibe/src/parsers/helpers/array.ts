import { ArrayExpression } from "@swc/core";
import { parseValue } from "./value.js";

export const parseArray = (arrayNode: ArrayExpression) => {
    const result = [];
    arrayNode.elements.forEach((element) => {
        const value = parseValue(element.expression);
        result.push(value);
    });
    return result;
};
