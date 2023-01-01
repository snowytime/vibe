import { StoryData } from "@type/globals.js";

export const generateStoryList = (entryData: StoryData[]) => {
	let storyStart = `export let stories = [\n`;
	const storyClose = `]`;
	entryData.forEach((story) => {
		// @ts-ignore
		storyStart += `{ component: ${story.id}, url: '${story.url}', path: '${
			story.path
		}', id: '${story.id}', storyName: ${
			// @ts-ignore
			story.storyName ? `'${story.storyName}'` : undefined
		}, name: '${story.componentName}' },\n`;
	});
	return (storyStart += storyClose);
};
