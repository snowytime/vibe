import { createHash } from "node:crypto";

export const generateId = (seed: string) => {
    return `Vibe${createHash("md5").update(seed).digest("hex")}`;
};
