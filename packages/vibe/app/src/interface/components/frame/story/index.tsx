import React from "react";
import Frame from "react-frame-component";
import { SynchronizeHead } from "../head.js";

import "./styles.scss";

export const Story = ({ children, framed }: { children: React.ReactNode; framed: boolean }) => {
    if (!framed) return <>{children}</>;
    return (
        <Frame
            initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>`}
            mountTarget='#root'
            className='vibe__frame'
        >
            <SynchronizeHead active={framed}>{children}</SynchronizeHead>
        </Frame>
    );
};
