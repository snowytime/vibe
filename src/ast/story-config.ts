import { ModuleItem } from "@swc/core";
import { StoryData } from "@type/globals.js";

// for the sake of simplicity, and the useability of vibe, we are only going to use the .config property
export const storyConfig = async (
	storyData: StoryData[],
	ast: ModuleItem[]
) => {
	const assignments = ast.filter(
		// @ts-ignore
		(i) => i?.expression?.type === "AssignmentExpression"
	);
	storyData.map((entry) => {
		getConfig(entry, assignments);
	});
	return storyData;
};

const getConfig = (entry, assignments) => {
	const assignment = assignments.find((item) =>
		isConfigDeclaration(item, entry.componentName)
	);
	// we need to parse this result to get the properties
	const value = assignment.expression.right;
	value.properties.forEach((property) => {
		// get the path (only restricted key)
		if (
			property.type === "KeyValueProperty" &&
			property.value.type === "StringLiteral" &&
			property.key.value === "path"
		) {
			// just toss it on the object
			entry["url"] = property.value.value;
			return;
		}
		// bare primitives (string, number, boolean)
		extractProperty(property, entry);
	});
};

// helpers
const isConfigDeclaration = (assignment, name) => {
	if (
		assignment.expression.left.object.value === name &&
		assignment.expression.left.property.value === "config"
	) {
		return true;
	}
};
const getBareLiteral = (property) => {
	return [property.key.value, property.value.value];
};
const extractProperty = (property, entry) => {
	const restricted = ["id", "componentName", "path", "url", "decorators"];
	// raw literals
	if (
		property.type === "KeyValueProperty" &&
		["StringLiteral", "BooleanLiteral", "NumberLiteral"].includes(
			property.value.type
		) &&
		!restricted.includes(property.key.value)
	) {
		// just toss it on the object
		const [key, value] = getBareLiteral(property);
		entry[key] = value;
	}
	if (
		property.type === "KeyValueProperty" &&
		property.value.type === "ArrayExpression" &&
		!restricted.includes(property.key.value)
	) {
		// just toss it on the object
		const elements = [];
		property.value.elements.forEach((element) => {
			elements.push(element.expression.value);
		});
		entry[property.key.value] = elements;
	}
};
