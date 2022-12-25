import { ModuleItem } from "@swc/core";

// other properties (i.e. decorator) is extracted later
export interface VisbyDefaultExport {
	title?: string;
	meta?: {
		[key: string]: string;
	};
}

export const extractDefaultExport = (ast: ModuleItem[]) => {
	const base = {
		title: undefined,
		meta: undefined
	};
	const defaultDeclaration = ast.find(
		(m) => m.type === "ExportDefaultExpression"
	);
	// make sure we are not trying to extract properties without a default export in the first place
	if (!defaultDeclaration) return base;
	(defaultDeclaration as any).expression.properties.map(
		(property: { type: string }) => {
			if (property.type === "KeyValueProperty") {
				getTitle(property, base);
				getMeta(property, base);
			}
		}
	);
	return base;
};

const getTitle = (property: any, obj: VisbyDefaultExport) => {
	if (property.key.value !== "title") return;
	if (property.value.type !== "StringLiteral") return;
	// set the title
	obj.title = property.value.value;
};

const getMeta = (property: any, obj: VisbyDefaultExport) => {
	if (property.key.value !== "meta") return;
	if (property.value.type !== "ObjectExpression") return;
	const meta = {};
	property.value.properties.forEach((prop: any) => getMetaEntry(prop, meta));
	obj.meta = meta;
};

const getMetaEntry = (property: any, meta: any) => {
	if (property.value.type.includes("Literal")) {
		meta[property.key.value] = property.value.value;
	}
	if (property.value.type === "ArrayExpression") {
		meta[property.key.value] = extractArray(property);
	}
};

const extractArray = (property: any) => {
	const arr = property.value.elements.map((element: any) => {
		return element.expression.value;
	});
	return arr;
};
