import { Config } from "#types/index.js";
import { findEntry } from "#finders/find-entry.js";
import { cleanPath } from "#helpers/clean-path.js";

export async function entryModule(config: Config) {
    const entryPath = await findEntry(config);
    const defaultEntry = `export const Entry = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`;
    if (!entryPath) {
        return defaultEntry;
    }
    return `import { default as Entry } from '${cleanPath(entryPath)}';\nexport { Entry };\n`;
}
