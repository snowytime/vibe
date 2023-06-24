import React from "react";
import { useRegistry } from "./internals/manager";

export const composer = (module: any, storyName: string, data: any) => {
    // some initial things
    const defaultExport = module.default ?? {};
    const component = module[storyName];
    const vibe = module[storyName].story ?? {};
    const defaultDecorator = defaultExport.decorator || (({ Component }) => <Component />);
    const storyDecorator = vibe.decorator || (({ Component }) => <Component />);

    const genericDecorator = (Component) => <Component />;
    // bring them together
    const args = { ...defaultExport, ...vibe, ...data };
    return () => {
        const { mappedStoryWrappers } = useRegistry();
        return mappedStoryWrappers(component, args);
    };
};
