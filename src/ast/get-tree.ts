import { StoryData } from "@type/globals.js";
import { astConverter } from "./initial.js";
import { named } from "./named.js";
import { storyConfig } from "./story-config.js";

// this function returns the story tree for all stories defined within the same file
// there is no data that is shared between stories, each story gets a config method that
// is defined as an object with various properties
export const getTree = async (path: string): Promise<StoryData[]> => {
	const ast = await astConverter(path);
	const stories = await named(ast, path);
	await storyConfig(stories, ast);
	return stories;
};
