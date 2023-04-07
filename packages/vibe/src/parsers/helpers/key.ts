import { PropertyName, StringLiteral } from "@swc/core";

export const parseKey = (keyNode: PropertyName | StringLiteral) => {
    switch (keyNode.type) {
        case "Identifier":
            return keyNode.value;
        case "StringLiteral":
            return {
                type: "Identifier",
                value: keyNode.value,
                optional: false,
            };
        default:
            return "";
    }
};
