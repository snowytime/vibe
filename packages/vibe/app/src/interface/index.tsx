import React from "react";

import { Sidebar } from "./sidebar";

import styles from "./styles.module.scss";
import { Window } from "./window";
import { useRegisterConsoleAddon } from "../addons/console/registration";
import { useRegisterDesignAddon } from "../addons/design/registration";

export const Vibe = ({ children }: { children: React.ReactNode }) => {
    useRegisterConsoleAddon();
    useRegisterDesignAddon();
    // useRegisterOutlineAddon();

    return (
        <div className={styles.main}>
            <Sidebar />
            <Window>{children}</Window>
        </div>
    );
};
