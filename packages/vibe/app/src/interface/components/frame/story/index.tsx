import React from "react";
import Frame from "react-frame-component";

import { SynchronizeHead } from "../head.js";
import "./styles.scss";
import { useRegistry } from "../../../../internals/manager";

export const Story = ({ children, framed }: { children: React.ReactNode; framed: boolean }) => {
    const { setFrameRef } = useRegistry();
    if (!framed) return <>{children}</>;
    return (
        <Frame
            initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0;"><div id="frame-root"></div></body></html>`}
            mountTarget='#frame-root'
            className='vibe__frame'
            sandbox='allow-scripts allow-same-origin'
            ref={setFrameRef}
        >
            <SynchronizeHead active={true}>{children}</SynchronizeHead>
        </Frame>
    );
};
