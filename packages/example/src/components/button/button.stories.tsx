import React from "react";
import { Button } from "./index";

export const Base = (props) => {
    return <Button {...props} />;
};

Base.story = {
    poop: "meep",
    arguments: {
        children: {
            type: "text",
            description: "description",
            value: "click me",
        },
    },
};
