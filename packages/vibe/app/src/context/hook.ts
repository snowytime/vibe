import { GenericContext } from "@snowytime/react-magic/helpers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { VibeContextItems } from "./types";

export const useVibe = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { dispatch, ...data } = useContext(GenericContext as any) as VibeContextItems;
    return {
        navigation: {
            Link,
            useNavigate,
            useLocation,
        },
        dispatch,
        ...data,
    };
};
