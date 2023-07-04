import { Story } from "#types/index.js";
import { DocsResult } from "./prepare-docs";

export function storyModule(stories: Story[], docs: DocsResult[]) {
    let storyStart = `export let stories = [\n`;
    const storyClose = `]`;
    stories.forEach((story) => {
        const resolvedDocSrc = docs.find((e) => e.storyPath === story.filePath)?.docId ?? null;
        storyStart += `{
            component: ${story.id},
            url: '${story.url}',
            filePath: '${story.filePath}',
            id: '${story.id}',
            name: '${story.name}',
            design: '${story.design ?? ""}',
            doc: ${resolvedDocSrc}
        },\n`;
    });
    storyStart += storyClose;
    return storyStart;
}
