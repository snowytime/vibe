import React from "react";
import { Story } from "@snowytime/vibe";
// import { useVibe } from "@snowytime/vibe/client";

type EntryProps = {
    children: React.ReactNode;
    stories: Story[];
};

export default function Entry({ children, stories }: EntryProps) {
    // const { storyUrls } = useVibe();
    React.useEffect(() => {
        // console.log(stories[0]);
        // console.log(storyUrls);
    }, []);
    return <>{children}</>;
}
