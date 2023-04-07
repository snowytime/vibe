import { Story } from "#types/index.js";
import { getStoryUrls } from "#structures/urls.js";

export function urlModule(stories: Story[]) {
    let urlBase = `export let storyUrls = [];\n`;
    if (stories) {
        const paths = getStoryUrls(stories);
        urlBase += `storyUrls = ${JSON.stringify(paths)}`;
    }
    return `${urlBase}`;
}
