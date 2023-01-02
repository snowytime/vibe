import { generateId } from "@helpers/id.js";
import { ModuleItem } from "@swc/core";
import { StoryData } from "@type/globals.js";

export const getNamed = (ast: ModuleItem[], path: string, family: any) => {
	// we want the named exports now
	const named: StoryData[] = [];
	const namedExports = ast.filter((e) => e.type === "ExportDeclaration");
	namedExports.forEach((declaration) => {
		const componentName = getComponentName(declaration);
		// filename is used only when there is no `path` declared in the family parser
		const familyPath = family.path || null;
		const fileName = path.split("/").at(-1)?.split(".")[0].toLowerCase();
		named.push({
			path,
			id: generateId(`${path}${componentName.toLowerCase()}`),
			componentName,
			url: resolveUrl(componentName.toLowerCase(), fileName, familyPath)
		});
	});
	return named;
};

// we always want to preserve the actual name of the component,
// the storyname is useful for ui things only
const getComponentName = (declaration: any) => {
	// currently only support arrow functions
	return declaration.declaration.declarations[0].id.value;
};

const resolveUrl = (
	componentName: string,
	fileName: string,
	familyPath: string | undefined
) => {
	console.log(familyPath);
	if (familyPath) {
		return `${familyPath}${
			familyPath.at(-1) === "/" ? "" : "/"
		}${componentName}`;
	} else {
		return `todo/${fileName}/${componentName}`;
	}
};
