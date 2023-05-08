import React from "react";

import { Sidebar } from "./sidebar";

import "./index.scss";
import { Window } from "./window";

export const Vibe = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='vibe__main'>
            <Sidebar />
            <Window>{children}</Window>
            {/* <DataPanel /> */}
        </div>
    );
};
