import { Story } from "#types/index.js";

export function storyModule(stories: Story[]) {
    let storyStart = `export let stories = [\n`;
    const storyClose = `]`;
    stories.forEach((story) => {
        storyStart += `{
            component: ${story.id},
            url: '${story.url}',
            filePath: '${story.filePath}',
            id: '${story.id}',
            name: '${story.name}',
            design: '${story.design ?? ""}'
        },\n`;
    });
    storyStart += storyClose;
    return storyStart;
}
