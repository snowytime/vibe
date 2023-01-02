import { extract } from "./family.js";

export const getVibe = (ast, stories, family) => {
	const assignments = ast.filter(
		// @ts-ignore
		(i) => i?.expression?.type === "AssignmentExpression"
	);
	// map over stories
	stories.forEach((story, i) => {
		const clone = (({ path, name, ...o }) => o)(family);
		stories[i] = getData(story, assignments, clone);
	});
	return stories;
};

// get data method
const getData = (story, assignments, data) => {
	const assignment = assignments.find((item) => {
		if (
			item.expression.left.object.value === story.componentName &&
			item.expression.left.property.value === "vibe"
		) {
			return true;
		}
		return false;
	});
	// we got a matching assignment
	if (!assignment) return story;
	// lets handle this assignment
	assignment.expression.right.properties.map((prop) => extract(data, prop));
	return { ...story, ...data };
};
