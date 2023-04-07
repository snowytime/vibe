import { Category, Story, Tree } from "#types/index.js";

function findWhere(array: Tree, key: keyof Category, value: string | Category) {
    let t = 0;
    while (t < array.length && array[t][key] !== value) {
        t++;
    }
    if (t < array.length) {
        return array[t];
    }
    return false;
}

export const generateTree = (stories: Story[]) => {
    const paths = stories.map((story) => ({
        ...story,
        url: story.url.split("/"),
    }));
    const tree: Tree = [];
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i].url;
        const originalObject = paths[i];
        let currentLevel = tree;
        for (let j = 0; j < path.length; j++) {
            const part = path[j];

            const existingPath = findWhere(currentLevel, "name", part);

            if (existingPath) {
                currentLevel = existingPath.children;
            } else {
                const newPart = {
                    name: part,
                    children: [],
                    path: "",
                    type: "folder",
                } as Category;
                if (j === path.length - 1) {
                    // last item
                    newPart.name = originalObject.name || originalObject.componentName;
                    newPart.path = `/${path.join("/")}`;
                    newPart.type = "file";
                } else {
                    newPart.type = "folder";
                }
                currentLevel.push(newPart);
                currentLevel = newPart.children;
            }
        }
    }
    return tree;
};
