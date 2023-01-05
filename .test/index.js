import { createHash } from "node:crypto";
const main = async () => {
	const hash = createHash("sha256")
		.update("super long string that is annoying")
		.digest("hex");
	console.log(hash);
};

main();
