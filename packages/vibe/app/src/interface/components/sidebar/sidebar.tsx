import React, { Fragment } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Header } from "./header/index";
import { Actions } from "./actions/index";
import { Search } from "./search/index";
import { Graph } from "./graph/index";
import { useVibe } from "../../../context";

import "./styles.scss";

export const Sidebar = () => {
    const { sidebarPanel } = useVibe();
    return (
        <Transition
            show={sidebarPanel.open}
            as={Fragment}
            enter='vibe__sidebar-transition'
            leave='vibe__sidebar-transition'
            enterFrom='vibe__sidebar-close'
            enterTo='vibe__sidebar-open'
            leaveFrom='vibe__sidebar-open'
            leaveTo='vibe__sidebar-close'
        >
            <div className='vibe__sidebar'>
                <Header />
                <Search />
                <Graph />
                <Actions />
            </div>
        </Transition>
    );
};
