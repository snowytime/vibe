import { ModuleItem } from "@swc/core";
import { generateId } from "../index.js";
import { VisbyDefaultExport } from "./default.js";
import { StoryData } from "@type/index.js";

// other properties (i.e. decorator) is extracted later

export const extractNamedExports = (
	ast: ModuleItem[],
	family: VisbyDefaultExport,
	path: string
) => {
	const named: StoryData[] = [];
	const namedExports = ast.filter((e) => e.type === "ExportDeclaration");
	namedExports.forEach((declaration) => {
		const componentName = getComponentName(declaration);
		const fileName = path.split("/").at(-1)?.split(".")[0].toLowerCase();
		const resolvedPathName = family.title
			? `${family.title}/${componentName.toLowerCase()}`
			: `todo/${fileName}/${componentName.toLowerCase()}`;
		named.push({
			url: resolvedPathName,
			path,
			id: generateId(resolvedPathName),
			componentName
		});
	});
	return named;
};

const getComponentName = (declaration: any) => {
	// currently only support arrow functions
	return declaration.declaration.declarations[0].id.value;
};
