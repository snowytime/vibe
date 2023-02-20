import { Config } from "#type/globals.js";

export const generateConfigImport = async (config?: Config) => {
    let configCode = `export let config = {};\n`;
    if (config) {
        configCode += `config = ${JSON.stringify(config)}`;
    }
    return `${configCode}`;
};
