import { findAddons } from "#finders/find-addons.js";

export async function addonsModule() {
    const addonsPath = await findAddons();
    const defaultAddons = `export const addons = [];\n`;
    if (!addonsPath) {
        return defaultAddons;
    }
    return `import addons from '${addonsPath}';\nexport { addons };\n`;
}
