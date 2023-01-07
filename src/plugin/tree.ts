import { Tree } from "@type/globals.js";

export const generateStoryTree = (storyTree: Tree) => {
    let treeBase = `export let storyTree = [];\n`;
    if (storyTree) {
        treeBase += `storyTree = ${JSON.stringify(storyTree)}`;
    }
    return `${treeBase}`;
};
