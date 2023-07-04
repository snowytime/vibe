interface Result {
    storyPath: string;
    docPath?: string;
}

const getIdentifier = (path: string) => path.split("/").at(-1).split(".")[0]; // avatar.stories.tsx => avatar

export const arrangeDocs = (
    storyPaths: string[],
    docsPaths: string[],
    purge?: boolean,
): Result[] => {
    const res = storyPaths.map((storyPath) => {
        return {
            storyPath,
            docPath: docsPaths.find((d) => getIdentifier(d) === getIdentifier(storyPath)) || null,
        };
    });
    if (!purge) return res;
    return res.filter((entry) => entry.docPath);
};
