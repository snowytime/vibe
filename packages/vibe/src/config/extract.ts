import { ExportDefaultExpression, ObjectExpression } from "@swc/core";
import { Config } from "#types/index.js";
import { prepare } from "../parsers/prepare.js";
import { findConfig, GenericError } from "../index.js";
import { resolveConfigs } from "./resolve.js";
import { parseObject } from "../parsers/helpers/object.js";

export const getConfig = async (): Promise<Config> => {
    const configPath = await findConfig();
    if (!configPath) {
        return resolveConfigs({} as Config);
    }
    try {
        const ast = await prepare(configPath);
        const node = ast.find((node): node is ExportDefaultExpression => {
            return node.type === "ExportDefaultExpression";
        });
        if (!node) {
            throw new GenericError({ message: "No default export found in config file" });
        }
        const config = parseObject(node.expression as ObjectExpression);
        return resolveConfigs(config as Config);
    } catch (e) {
        if (e instanceof Error) {
            throw new GenericError(e);
        }
        throw e;
    }
};
