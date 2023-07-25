import React from "react";
import { Avatar } from "./index.js";
import { Cardinal } from "@snowytime/vibe/client";

export default {
    path: "atoms/avatar",
};

export const Base = () => {
    return (
        <>
            <Cardinal count={12} plural='Games' singular='Game' />
            <Avatar />
        </>
    );
};
Base.story = {
    name: "Base",
    decorator: ({ Component }) => <Component />,
};
