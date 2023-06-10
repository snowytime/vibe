import React from "react";
import Frame from "react-frame-component";
import { useDomRef } from "@snowytime/react-magic/hooks";

import { SynchronizeHead } from "../head.js";
// import { useOutlineAddon } from "../../../hooks/useOutlineAddon.js";

import "./styles.scss";

export const Story = ({ children, framed }: { children: React.ReactNode; framed: boolean }) => {
    const [ref, setRef] = useDomRef<HTMLIFrameElement>();
    // useOutlineAddon(ref);
    if (!framed) return <>{children}</>;
    return (
        <Frame
            initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="frame-root"></div></body></html>`}
            mountTarget='#frame-root'
            className='vibe__frame'
            sandbox='allow-scripts allow-same-origin'
            ref={setRef}
        >
            <SynchronizeHead active={framed}>{children}</SynchronizeHead>
        </Frame>
    );
};
