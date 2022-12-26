import { customAlphabet } from "nanoid";

/**
 * @returns a story id that is used to reference the id without any possible namespace conflicts
 */
export const generateId = () => {
	const hash = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10)();
	return `Vibe_${hash}`;
};
