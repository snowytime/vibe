import { findStories } from "@finders/find-stories.js";
import { getStoryData } from "@parsers/together.js";
import { Config } from "@type/globals.js";
import { generateConfigImport } from "./config.js";
import { generateDynamicImports } from "./dynamic.js";
import { generateEntryImport } from "./entry.js";
import { generateStoryList } from "./story-list.js";
import { generateStoryUrls } from "./story-urls.js";
import { generateStoryTree } from "./tree.js";

export const allImports = async (config: Config) => {
    const configImport = await generateConfigImport(config);
    // we just do all the data sources directly here
    const stories = await findStories(config);
    const storyData = await getStoryData(stories);
    // start generating
    const storyTreeStr = generateStoryTree(storyData);
    const storyUrlsStr = generateStoryUrls(storyData);
    const dynamic = generateDynamicImports(storyData);
    const storyList = generateStoryList(storyData);
    const entry = await generateEntryImport(config);
    // gather it all together
    let str = "";
    str += `\n${configImport}`;
    str += `\n${dynamic}`;
    str += `\n${entry}`;
    str += `\n${storyList}`;
    str += `\n${storyTreeStr}`;
    str += `\n${storyUrlsStr}`;
    return str;
};
