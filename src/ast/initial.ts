import { GenericError } from "#errors/index.js";
import { isEsm } from "#helpers/is-esm.js";
import swc from "@swc/core";
import fs from "node:fs";

enum Syntax {
	TS = "typescript",
	JS = "ecmascript"
}

const getDetails = (path: string) => {
	let react = false;
	let syntax = Syntax.JS;
	const esm = isEsm(path);
	const extension = path.split("/").at(-1)?.split(".").at(-1);
	if (!extension) {
		throw new GenericError({
			message: `Parser failed to resolve the extension of ${path}`
		});
	}
	if (extension.split("").at(-1) === "x") {
		react = true;
	}
	if (["ts", "tsx"].includes(extension)) {
		syntax = Syntax.TS;
	}
	return { react, syntax, esm };
};

const ast = (
	react: boolean,
	esm: boolean,
	syntax: Syntax,
	raw: string
): Promise<swc.Module> => {
	return new Promise((resolve, reject) => {
		swc.parse(raw, {
			syntax: syntax,
			comments: false,
			script: true,
			...(syntax === Syntax.TS ? { tsx: react } : {}),
			...(syntax === Syntax.JS ? { jsx: react } : {}),
			...(esm ? { isModule: esm } : {})
		})
			.then((r) => resolve(r))
			.catch((e) => reject(e));
	});
};

// this will simply return the appropriate ast
export const astConverter = async (path: string) => {
	const { react, syntax, esm } = getDetails(path);
	const raw = await fs.promises.readFile(path, "utf-8");
	const { body } = await ast(react, esm, syntax, raw);
	return body;
};
