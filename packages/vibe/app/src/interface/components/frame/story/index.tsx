import React from "react";
import Frame from "react-frame-component";

import { SynchronizeHead } from "../head.js";
import "./styles.scss";
import { useRegistry } from "../../../../internals/manager";

export const Story = ({ children }: { children: React.ReactNode }) => {
    const { setFrameRef } = useRegistry();
    return (
        <Frame
            initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0;"><div id="frame-root"></div></body></html>`}
            mountTarget='#frame-root'
            className='vibe__frame'
            id='window-frame'
            sandbox='allow-scripts allow-same-origin'
            ref={setFrameRef}
        >
            <SynchronizeHead>{children}</SynchronizeHead>
        </Frame>
    );
};
