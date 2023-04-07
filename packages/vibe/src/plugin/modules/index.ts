import { Config } from "#types/index.js";
import { findStories } from "#finders/find-stories.js";
import { exportResolve } from "#parsers/export-resolve.js";
import { configModule } from "./config.js";
import { storyModule } from "./stories.js";
import { entryModule } from "./entry.js";
import { mainModule } from "./main.js";
import { urlModule } from "./urls.js";
import { treeModule } from "./tree.js";

export const assembleModules = async (config: Config) => {
    const stories = await findStories(config);
    const storyData = await exportResolve(stories);
    // modules
    const configModuleReturn = configModule(config);
    const storyModuleReturn = storyModule(storyData);
    const entryModuleReturn = await entryModule(config);
    const mainModuleReturn = mainModule(storyData);
    const urlModuleReturn = urlModule(storyData);
    const treeModuleReturn = treeModule(storyData);
    // assemble
    let str = "";
    // order matters here !!!
    const modules = [
        configModuleReturn,
        mainModuleReturn,
        entryModuleReturn,
        storyModuleReturn,
        treeModuleReturn,
        urlModuleReturn,
    ];
    modules.forEach((module) => {
        str += `${module}\n`;
    });
    return str;
};
