import { Story } from "#types/index.js";
import { generateTree } from "#structures/tree.js";

export function treeModule(stories: Story[]) {
    let treeBase = `export let storyTree = [];\n`;
    if (stories) {
        const storyTree = generateTree(stories);
        treeBase += `storyTree = ${JSON.stringify(storyTree)}`;
    }
    return `${treeBase}`;
}
