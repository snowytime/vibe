import React from "react";
import { Button } from "./index";

export const Base = (props) => {
    return <Button {...props} />;
};

export const Console = () => {
    return (
        <>
            <button type='button' role='button' tabIndex={0} onClick={() => console.log("hello")}>
                string
            </button>
            <button type='button' role='button' tabIndex={0} onClick={() => console.log(true)}>
                boolean
            </button>
            <button type='button' role='button' tabIndex={0} onClick={() => console.log(123)}>
                number
            </button>
            <button
                type='button'
                role='button'
                tabIndex={0}
                onClick={() => console.log([1, "hello world", 3, true, 5])}
            >
                array
            </button>
            <button
                type='button'
                role='button'
                tabIndex={0}
                onClick={() =>
                    console.log([
                        1,
                        [1, 2, 3],
                        true,
                        { name: "1", arr: [2, true, "world"], age: 2 },
                        undefined,
                        null,
                    ])
                }
            >
                other array
            </button>
        </>
    );
};

Base.story = {
    poop: "meep",
    design: "https://www.figma.com/embed?embed_host=localhost&url=https://www.figma.com/file/Ekqg8F9tdUCaVCWRcdIZp7/Untitled?type=design&node-id=0-1&t=ftpROuazSUeOIpYp-0",
    arguments: {
        children: {
            type: "text",
            description: "description",
            value: "click me",
        },
        disabled: {
            type: "toggle",
            description: "toggles the disabled state",
            value: false,
        },
        variant: {
            type: "radio",
            value: "second",
            options: ["first", "second", "third"],
        },
    },
};
