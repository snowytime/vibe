import React from "react";

import { Sidebar } from "./sidebar";

import "./index.scss";
import { Window } from "./window";
import { useRegisterConsoleAddon } from "../addons/console/registration";
import { useRegisterControlsAddon } from "../addons/controls/registration";
import { useRegisterDesignAddon } from "../addons/design/registration";
import { useRegisterOutlineAddon } from "../addons/outline/registration";

export const Vibe = ({ children }: { children: React.ReactNode }) => {
    useRegisterConsoleAddon();
    useRegisterControlsAddon();
    useRegisterDesignAddon();
    // useRegisterOutlineAddon();

    return (
        <div className='vibe__main'>
            <Sidebar />
            <Window>{children}</Window>
        </div>
    );
};
