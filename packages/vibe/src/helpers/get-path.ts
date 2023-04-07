import { relative, resolve } from "node:path";

export const getPath = (filePath: string) => {
    const rootDir = resolve(process.cwd());
    const relativePath = relative(rootDir, filePath);
    return relativePath.replace(/\.(playground|svelte)/g, "");
};
