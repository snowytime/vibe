import React from "react";

export const Component = () => <button>hello</button>;
Component.config = {
    name: '1',
    age: 10,
    open: false,
    tags: ['pre', 2, false],
    path: 'atoms/avatar',
    decorators: [
        ({ Component }) => <Component />
    ],
    arguments: {
        name: 'Snaer'
    }
};

export const Component2 = () => <button>hello</button>;
Component2.config = {
    name: '2',
    storyName: 'Some custom name'
};

export const Component3 = () => <button>hello</button>;
Component3.config = {
    name: '3'
};
