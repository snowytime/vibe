import React from "react";
import { Story } from "@snowytime/vibe";
// import { useVibe } from "@snowytime/vibe/client";

type EntryProps = {
    children: React.ReactNode;
    stories: Story[];
};

// import some styles
import "@snowytime/css/fonts/visby/all.css";
import "@snowytime/css/presets/visby.css";
import "./example.css";

export default function Entry({ children, stories }: EntryProps) {
    // const { storyUrls } = useVibe();
    return <>Entry: {children}</>;
}
