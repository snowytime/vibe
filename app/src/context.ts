import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LadleContext from "@ladle/react-context";

export const Context = LadleContext;

export const useVibeContext = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { stories, storyTree, config, storyUrls } = React.useContext(Context as any) as any;
    return { storyTree, storyUrls, stories, Link, useNavigate, useLocation, config };
};
