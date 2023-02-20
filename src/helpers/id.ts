import { createHash } from "node:crypto";
export const generateId = (seed: string) => {
    return "Vibe" + createHash("sha256").update(seed).digest("hex");
};
