import { useEffect, useMemo, useState } from "react";
import { Tree } from "../../types";
import { useVibeContext } from "../../context";

function filterTree(initialTree: Tree, searchQuery: string): Tree {
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

export const useFilter = (search: string) => {
    const { storyTree, dispatch } = useVibeContext();

    useEffect(() => {
        if (search === "") {
            // reset to original tree if search query is empty
            dispatch({ type: "setFilteredTree", payload: storyTree });
        } else {
            // filter tree based on search query
            const filtered = filterTree(storyTree, search);
            dispatch({ type: "setFilteredTree", payload: filtered });
        }
    }, [storyTree, search, dispatch]);
};
