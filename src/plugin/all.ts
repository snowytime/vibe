import { Tree } from "@structures/generate-tree.js";
import { Config, StoryData } from "@type/globals.js";
import { generateConfigImport } from "./config.js";
import { generateDynamicImports } from "./dynamic.js";
import { generateEntryImport } from "./entry.js";
import { generateStoryList } from "./story-list.js";
import { generateStoryTree } from "./tree.js";

export const allImports = async (
	entryData: StoryData[],
	config: Config,
	storyTree: Tree
) => {
	const configImport = await generateConfigImport(config);
	// dynamic returns all the component lazy imports and related things
	const dynamic = generateDynamicImports(entryData);
	// this is the story list that references the components defined above
	const storyList = generateStoryList(entryData);
	const storyTreeStr = generateStoryTree(storyTree);
	// entry
	const entry = await generateEntryImport(config);
	let str = "";
	str += `\n${configImport}`;
	str += `\n${dynamic}`;
	str += `\n${storyList}`;
	str += `\n${storyTreeStr}`;
	str += `\n${entry}`;
	return str;
};
