import { ModuleItem } from "@swc/core";

/**
 * What we are extracting
 * -> path: string
 * -> key value pairs under the meta tag
 */
export const getFamily = (ast: ModuleItem[]) => {
	const result = {};
	const defaultExportDeclaration = ast.find(
		(entry) => entry.type === "ExportDefaultExpression"
	);
	if (!defaultExportDeclaration) return result;
	// @ts-ignore
	defaultExportDeclaration.expression.properties.map((property) => {
		extract(result, property);
	});
	return result;
};

export const extract = (result, property) => {
	// only accept key value properties
	if (property.type !== "KeyValueProperty") return;
	// decorator is to be ignored since this step doesn't need it
	if (property.key.value === "decorator") return;
	// path is an important property, and must be a string
	if (property.key.value === "path") {
		if (property.value.type !== "StringLiteral") return;
		result["path"] = property.value.value;
	}
	// time to iterate over what we have
	if (isRaw(property)) {
		const [key, value] = rawKeyValue(property);
		result[key] = value;
		return;
	}
	if (isObject(property)) {
		// handle the object property properly
		objectExtractor(result, property);
	}
	if (isArray(property)) {
		// handle the array property properly
		arrayExtractor(result, property);
	}
};

// array handler
const arrayExtractor = (result, property) => {
	// initial array
	result[property.key.value] = [];
	property.value.elements.forEach((entry) => {
		if (entry.expression.type === "ObjectExpression") {
			const obj = {};
			entry.expression.properties.forEach((item) => {
				extract(obj, item);
			});
			result[property.key.value].push(obj);
		}
		if (
			[
				"BooleanLiteral",
				"NumericLiteral",
				"StringLiteral",
				"NullLiteral"
			].includes(entry.expression.type)
		) {
			// the simplest of the bastards
			result[property.key.value].push(entry.expression.value || null);
		}
	});
};

// raw handler
const rawKeyValue = (property) => {
	return [property.key.value, property.value.value];
};

// object handler
const objectExtractor = (result, property) => {
	const object = {};
	property.value.properties.forEach((item) => {
		extract(object, item);
	});
	result[property.key.value] = object;
};

// identifier helpers
const isObject = (property) => property.value.type === "ObjectExpression";
const isArray = (property) => property.value.type === "ArrayExpression";
const isRaw = (property) =>
	[
		"BooleanLiteral",
		"NumericLiteral",
		"StringLiteral",
		"NullLiteral"
	].includes(property.value.type);
