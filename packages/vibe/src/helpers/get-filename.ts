export const getFilename = (path: string) => {
    const parts = path.split("/");
    const lastPartWithExtension = parts[parts.length - 1];
    const lastPartWithoutExtension = lastPartWithExtension.split(".")[0];
    return lastPartWithoutExtension;
};
