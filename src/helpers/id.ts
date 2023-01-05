import { createHash } from "node:crypto";
export const generateId = (seed: string) => {
	return createHash("sha256").update(`Vibe${seed}`).digest("hex");
};
