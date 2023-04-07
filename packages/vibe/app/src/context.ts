import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GenericContext } from "@snowytime/react-magic/helpers";
import { VibeContext } from "./types.js";

export const Context = GenericContext;

export const useVibeContext = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { stories, storyTree, config, storyUrls } = React.useContext(
        GenericContext as any,
    ) as VibeContext;
    return { storyTree, storyUrls, stories, Link, useNavigate, useLocation, config };
};
