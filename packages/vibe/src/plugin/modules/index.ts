import { Config } from "#types/index.js";
import { findStories } from "#finders/find-stories.js";
import { exportResolve } from "#parsers/export-resolve.js";
import { configModule } from "./config.js";
import { storyModule } from "./stories.js";
import { entryModule } from "./entry.js";
import { mainModule } from "./main.js";
import { urlModule } from "./urls.js";
import { treeModule } from "./tree.js";
import { addonsModule } from "./addons.js";
import { findDocs } from "#finders/find-docs.js";
import { prepareDocs } from "./prepare-docs.js";
import { docModule } from "./docs-module.js";

export const assembleModules = async (config: Config) => {
    // gatherers
    const stories = await findStories(config);
    const docs = await findDocs(config);
    const storyData = await exportResolve(stories.sort());
    const docsData = prepareDocs(storyData, docs);
    // modules
    const configModuleReturn = configModule(config);
    const docsModuleReturn = docModule(docsData);
    const storyModuleReturn = storyModule(storyData, docsData);
    const entryModuleReturn = await entryModule(config);
    const mainModuleReturn = mainModule(storyData);
    const urlModuleReturn = urlModule(storyData);
    const treeModuleReturn = treeModule(storyData);
    const addonsModuleReturn = await addonsModule();
    // assemble
    let str = "";

    // order matters here !!!
    const modules = [
        configModuleReturn,
        mainModuleReturn,
        entryModuleReturn,
        docsModuleReturn,
        storyModuleReturn,
        treeModuleReturn,
        urlModuleReturn,
        addonsModuleReturn,
    ];
    modules.forEach((module) => {
        str += `${module}\n`;
    });
    return str;
};
