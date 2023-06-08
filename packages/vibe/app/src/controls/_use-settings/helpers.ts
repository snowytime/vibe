import { Tree } from "../../types";

export function filterTree(initialTree: Tree, searchQuery: string): Tree {
    const tree = structuredClone(initialTree);
    const regex = new RegExp(searchQuery, "i");
    return tree.filter((category) => {
        if (category.name.match(regex)) {
            // match found, keep category and all children
            return true;
        }
        if (category.type === "folder") {
            // recursively filter children
            const filteredChildren = filterTree(category.children, searchQuery);
            if (filteredChildren.length > 0) {
                // keep folder if it has any matching children
                category.children = filteredChildren;
                return true;
            }
        }
        // no match found, remove category from tree
        return false;
    });
}
