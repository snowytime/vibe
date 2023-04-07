import { Story } from "#types/index.js";

export function mainModule(stories: Story[]) {
    let storyImports = `import React, { lazy, createElement, Fragment } from "react";\n`;
    storyImports += `import { composer } from "/src/composer";\n`;

    stories.forEach((story) => {
        storyImports += `\n${`
	const ${story.id} = lazy(() => import('${story.filePath}').then((module) => {
	        return { default: composer(module, '${story.componentName}', ${JSON.stringify(story)}) };
	    })
	);
	`}`;
    });
    return storyImports;
}
