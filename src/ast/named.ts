import { generateId } from "@helpers/id.js";
import { ModuleItem } from "@swc/core";
import { StoryData } from "@type/globals.js";

export const named = async (ast: ModuleItem[], path: string) => {
	const named: StoryData[] = [];
	const namedExports = ast.filter((e) => e.type === "ExportDeclaration");
	namedExports.forEach((declaration) => {
		const componentName = getComponentName(declaration);
		const fileName = path.split("/").at(-1)?.split(".")[0].toLowerCase();
		named.push({
			path,
			id: generateId(`${path}${componentName}`),
			componentName,
			// the url will be changed if we find a `name` property in the story config
			url: `todo/${fileName}/${componentName}`
		});
	});
	return named;
};

const getComponentName = (declaration: any) => {
	// currently only support arrow functions
	return declaration.declaration.declarations[0].id.value;
};
