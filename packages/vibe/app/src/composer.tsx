import React from "react";
import { Argument } from "./args";

export const composer = (module: any, storyName: string, data: any) => {
    // some initial things
    const defaultExport = module.default ?? {};
    const component = module[storyName];
    const vibe = module[storyName].story ?? {};
    const defaultDecorator = defaultExport.decorator || (({ Component }) => <Component />);
    const storyDecorator = vibe.decorator || (({ Component }) => <Component />);
    // bring them together
    const args = { ...defaultExport, ...vibe, ...data };
    return () =>
        defaultDecorator({
            Component: () =>
                storyDecorator({
                    Component: () => (
                        <Argument args={vibe.arguments || {}} data={args}>
                            {component}
                        </Argument>
                    ),
                    ...args,
                }),
            ...args,
        });
};
