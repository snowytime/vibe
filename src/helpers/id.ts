export const generateId = (seed: string) => {
	return `Vibe_${seed.replace(/\//g, "_")}`;
};
