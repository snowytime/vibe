import React from "react";
import Frame from "react-frame-component";

export const Story = ({ children }: { children: React.ReactNode }) => {
    return <Frame>{children}</Frame>;
};
