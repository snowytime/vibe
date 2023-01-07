import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "./main.js";

export const useVibeContext = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { stories, storyTree, config } = React.useContext(Context as any) as VibeContext;
    return { storyTree, stories, Link, useNavigate, useLocation, config };
};
