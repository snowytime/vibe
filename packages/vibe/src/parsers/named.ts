// extracting the default export from the generated ast
import {
    AssignmentExpression,
    ExportDeclaration,
    ExpressionStatement,
    Identifier,
    MemberExpression,
    ModuleItem,
    VariableDeclaration,
} from "@swc/core";
import { parseObject } from "./helpers/object.js";

export const parseNamedExports = (ast: ModuleItem[] | undefined) => {
    const stories = ast.filter((node) => {
        return node.type === "ExportDeclaration";
    });

    if (stories.length === 0) {
        return [];
    }

    // to make sure that we only grab the react-able stories
    const validStories = stories
        .map((story: ExportDeclaration) => {
            if ((story.declaration as VariableDeclaration).declarations.length === 0) return null;
            const name = (
                (story.declaration as VariableDeclaration).declarations[0].id as Identifier
            ).value;
            if (name[0] === name[0].toUpperCase()) {
                return name;
            }
            return null;
        })
        .filter((s) => s);

    // grab all the ExpressionStatements
    const expressions = ast.filter((node) => {
        return (
            node.type === "ExpressionStatement" &&
            validStories.includes(
                (
                    ((node.expression as AssignmentExpression).left as MemberExpression)
                        .object as Identifier
                ).value,
            )
        );
    }) as ExpressionStatement[];

    // now we can use the parseObject to get the named exports, deleting any path parameter
    const namedResults = [];
    for (const componentName of validStories) {
        const matchedStoryData = expressions.find(
            (expression) =>
                (
                    ((expression.expression as AssignmentExpression).left as MemberExpression)
                        .object as Identifier
                ).value === componentName,
        );
        const result = matchedStoryData
            ? {
                  ...parseObject((matchedStoryData.expression as any).right),
              }
            : {
                  name: componentName.toLowerCase(),
              };
        const name = result.name || componentName.toLowerCase();
        // resolve the path
        if (result.hasOwnProperty("path")) {
            delete (result as any).path;
        }
        if (result.hasOwnProperty("decorator")) {
            delete (result as any).decorator;
        }
        // we wanna add a couple of things to the result
        namedResults.push({
            ...result,
            name,
            componentName,
        });
    }

    return namedResults;
};
