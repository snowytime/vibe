import path from "node:path";
import { getStoryData } from "../dist/ast/together.js";

const main = async () => {
	const startTime = performance.now();
	const data = await getStoryData([
		path.join(process.cwd(), ".test/test.jsx")
	]);
	const stopTime = performance.now();
	const duration = stopTime - startTime;
	console.log(`:: Processed in ${duration.toFixed(2)}ms`);
	console.log(data);
};

main();
