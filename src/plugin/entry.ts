import { findEntry } from "@finders/find-entry.js";
import { findFolder } from "@finders/find-folder.js";
import { Config } from "@type/globals.js";

export const generateEntryImport = async (config: Config) => {
	const [folder] = await findFolder();
	const [entryPath] = await findEntry(config, folder);
	const defaultEntry = `export const Entry = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`;
	if (!entryPath) {
		return defaultEntry;
	}
	return `import { Entry as CustomEntry } from '${entryPath}';\nexport const Entry = CustomEntry;\n`;
};
