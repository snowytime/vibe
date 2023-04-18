import React from "react";
import { Button } from "./index";

export const Base = (props) => {
    return <Button {...props} />;
};

Base.story = {
    poop: "meep",
    arguments: {
        name: {
            type: "text",
            description: "description",
            value: "click me",
        },
    },
};
