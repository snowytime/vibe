import { ObjectExpression } from "@swc/core";
import { parseKey } from "./key.js";
import { parseValue } from "./value.js";

export const parseObject = (obj: ObjectExpression) => {
    const result: { [key: string]: unknown } = {};
    obj.properties.forEach((prop) => {
        if (prop.type === "KeyValueProperty") {
            const key = parseKey(prop.key);
            const value = parseValue(prop.value);
            result[key.toString()] = value;
        }
    });

    return result;
};
