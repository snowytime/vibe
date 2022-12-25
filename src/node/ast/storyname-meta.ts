import { VisbyDefaultExport } from "./default.js";

export const extractStorynameMeta = (
	namedData: any[],
	ast: any[],
	family: VisbyDefaultExport
) => {
	const assignments = ast.filter(
		(i) => i?.expression?.type === "AssignmentExpression"
	);
	assignments.forEach((assignment) => {
		// we need to find the component name
		if (assignment?.expression?.left.property?.value === "storyName") {
			const component = namedData.find(
				(entry) =>
					entry.componentName ===
					assignment.expression.left.object.value
			);
			component["storyName"] = assignment.expression.right.value;
		}
		// possible meta
		if (assignment?.expression?.left?.property?.value === "meta") {
			const meta = {
				...(family.meta ? family.meta : {})
			};
			getMeta(assignment.expression.right.properties, meta);
			const component = namedData.find(
				(entry) =>
					entry.componentName ===
					assignment.expression.left.object.value
			);
			component["meta"] = meta;
		}
	});
};

const getMeta = (property: any, obj: VisbyDefaultExport) => {
	property.forEach((prop: any) => getMetaEntry(prop, obj));
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
