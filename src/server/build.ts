import { performance } from "node:perf_hooks";
import { getBase } from "./base.js";
import { build } from "vite";
import { join } from "node:path";
import { getVibeData } from "../main/index.js";

export const buildProduction = async () => {
	const startTime = performance.now();
	const { subscribers, config, vitePath } = await getVibeData();
	const destination = join(process.cwd(), config.out);
	try {
		const viteConfig = await getBase(
			{
				mode: "production",
				build: {
					outDir: destination,
					emptyOutDir: true
				}
			},
			vitePath,
			config
		);
		await build(viteConfig);
	} catch (e) {
		console.log(e);
	}
	const stopTime = performance.now();
	const duration = stopTime - startTime;
	return {
		stories: subscribers.length - 1,
		destination,
		duration
	};
};
