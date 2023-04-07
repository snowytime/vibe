import React from "react";
import Frame from "react-frame-component";
import { SynchronizeHead } from "./head.js";

export const Story = ({ children, framed }: { children: React.ReactNode; framed: boolean }) => {
    if (!framed) return <>{children}</>;
    return (
        <Frame
            initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>`}
            mountTarget='#root'
            style={{
                width: "100%",
                marginTop: 0,
                marginBottom: 0,
                border: 0,
                boxShadow: "none",
                backgroundColor: "none",
            }}
        >
            <SynchronizeHead active={framed}>{children}</SynchronizeHead>
        </Frame>
    );
};
