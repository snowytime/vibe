import { Config } from "#types/index.js";
import { findEntry } from "#finders/find-entry.js";
import { cleanPath } from "#helpers/clean-path.js";

export async function entryModule(config: Config) {
    const entryPath = await findEntry(config);
    return `export const Entry = lazy(() => import('${cleanPath(entryPath)}').then((module) => {
        return module;
    }));export `;
}
