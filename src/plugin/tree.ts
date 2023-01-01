import { Tree } from "@structures/generate-tree.js";

export const generateStoryTree = (storyTree: Tree) => {
	let treeBase = `export let storyTree = [];\n`;
	if (storyTree) {
		treeBase += `storyTree = ${JSON.stringify(storyTree)}`;
	}
	return `${treeBase}`;
};
