import { findEntry } from "@finders/find-entry.js";
import { Config } from "@type/globals.js";

export const generateEntryImport = async (config: Config) => {
    const entryPath = await findEntry(config);
    const defaultEntry = `export const Entry = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`;
    if (!entryPath) {
        return defaultEntry;
    }
    return `import CustomEntry from '${entryPath}';\nexport const Entry = CustomEntry;\n`;
};
