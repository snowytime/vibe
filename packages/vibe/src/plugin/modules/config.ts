import { Config } from "#types/index.js";

export function configModule(config: Config) {
    let configCode = `export let config = {};\n`;
    if (config) {
        configCode += `config = ${JSON.stringify(config)}`;
    }
    return `${configCode}`;
}
