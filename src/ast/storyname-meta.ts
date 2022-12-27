export const extractStorynameMeta = (namedData, ast, family) => {
	const assignments = ast.filter(
		(i) => i?.expression?.type === "AssignmentExpression"
	);
	namedData.forEach((named) => {
		let meta = {};
		if (family.meta) {
			meta = family.meta;
		}
		named["meta"] = meta;
	});
	assignments.forEach((assignment) => {
		if (assignment.expression.left.object?.value) {
			const isStoryName =
				assignment.expression.left.property.value === "storyName";
			const isMeta = assignment.expression.left.property.value === "meta";
			if (!isStoryName && !isMeta) {
				return;
			}
			const component = namedData.find(
				(entry) =>
					entry.componentName ===
					assignment.expression.left.object?.value
			);
			if (isStoryName) {
				component["storyName"] = assignment.expression.right.value;
			}
			if (isMeta) {
				const customMeta = {};
				getMeta(assignment.expression.right.properties, customMeta);
				component["meta"] = { ...component.meta, ...customMeta };
			}
		}
	});
};
const getMeta = (property, obj) => {
	property.forEach((prop) => getMetaEntry(prop, obj));
};
const getMetaEntry = (property, meta) => {
	if (property.value.type.includes("Literal")) {
		meta[property.key.value] = property.value.value;
	}
	if (property.value.type === "ArrayExpression") {
		meta[property.key.value] = extractArray(property);
	}
};
const extractArray = (property) => {
	const arr = property.value.elements.map((element) => {
		return element.expression.value;
	});
	return arr;
};
