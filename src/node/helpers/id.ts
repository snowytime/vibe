/**
 * @returns a story id that is used to reference the id without any possible namespace conflicts
 */
export const generateId = async () => {
	const nano = await import("nanoid");
	const hash = nano.customAlphabet(
		"abcdefghijklmnopqrstuvwxyz1234567890",
		10
	)();
	return `Vibe-${hash}`;
};
