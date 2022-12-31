import { getTree } from "./dist/ast/_/get-tree.js";

const main = async () => {
	const startTime = performance.now();
	const data = await getTree("./test.jsx");
	const stopTime = performance.now();
	const duration = stopTime - startTime;
	console.log(`All stories parsed in ${duration.toFixed(2)}ms`);
	console.log(data);
};

main();
