import { generateTree } from "#structures/generate-tree.js";
import { StoryData } from "#type/globals.js";

export const generateStoryTree = (storyData: StoryData[]) => {
    let treeBase = `export let storyTree = [];\n`;
    if (storyData) {
        const storyTree = generateTree(storyData);
        treeBase += `storyTree = ${JSON.stringify(storyTree)}`;
    }
    return `${treeBase}`;
};
