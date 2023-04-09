import React from "react";
import { Sidebar } from "./components/sidebar/sidebar";

import "./index.scss";
import { Window } from "./components/window/window";

export const Vibe = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='vibe__main'>
            <Sidebar />
            <Window>{children}</Window>
        </div>
    );
};
