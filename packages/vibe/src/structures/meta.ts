import { Config, JsonStructure, Story } from "#types/index.js";

export const getJson = (stories: Story[], config: Config): JsonStructure => {
    const result: JsonStructure = {
        website: config.website,
        repo: config.repo,
        version: config.version,
        project: config.project,
        stories: {},
    };
    stories.forEach((story) => {
        result.stories[story.id] = {
            ...story,
        };
    });
    return result;
};
