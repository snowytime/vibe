import { Module, parse } from "@swc/core";
import { promises } from "node:fs";
import { GenericError } from "#helpers/error.js";

/*
Convert a file to an abstract syntax tree (AST) and return it.
*/
enum Syntax {
    TS = "typescript",
    JS = "ecmascript",
}

const getDetails = (path: string) => {
    let syntax = Syntax.JS;
    const react = true;
    const extension = path.split("/").at(-1)?.split(".").at(-1);
    if (!extension) {
        throw new GenericError({
            message: `Parser failed to resolve the extension of ${path}`,
        });
    }
    if (["ts", "tsx"].includes(extension)) {
        syntax = Syntax.TS;
    }
    return { react, syntax };
};

const getAst = (react: boolean, syntax: Syntax, raw: string): Promise<Module> => {
    return new Promise((resolve, reject) => {
        parse(raw, {
            syntax,
            comments: false,
            dynamicImport: true,
            decorators: true,
            exportDefaultFrom: true,
            classPrivateProperty: true,
            nullishCoalescing: true,
            optionalChaining: true,
            importMeta: true,
            topLevelAwait: true,
            script: true,
            ...(syntax === Syntax.TS ? { tsx: react } : {}),
            ...(syntax === Syntax.JS ? { jsx: react } : {}),
        })
            .then((r) => resolve(r))
            .catch((e) => reject(e));
    });
};

// this will simply return the appropriate ast
export const prepare = async (path: string) => {
    const { react, syntax } = getDetails(path);
    const raw = await promises.readFile(path, "utf-8");
    const { body } = await getAst(react, syntax, raw);
    return body;
};
