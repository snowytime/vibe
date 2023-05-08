import React, { Fragment } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Header } from "./header/index";
import { Actions } from "./actions/index";
import { Search } from "./search/index";
import { Graph } from "./graph/index";

import { useSettings } from "../../controls/use-settings";

import styles from "./styles.module.scss";

export const Sidebar = () => {
    const { sidebarOpen } = useSettings();
    return (
        <Transition
            show={sidebarOpen}
            as={Fragment}
            enter={styles.transition}
            leave={styles.transition}
            enterFrom={styles.close}
            enterTo={styles.open}
            leaveFrom={styles.open}
            leaveTo={styles.close}
        >
            <div className={styles.sidebar}>
                <Header />
                <Search />
                <Graph />
                <Actions />
            </div>
        </Transition>
    );
};
