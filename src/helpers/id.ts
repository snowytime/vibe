export const generateId = (seed: string) => {
	return "Vibe_" + Buffer.from(seed).toString("hex");
};
