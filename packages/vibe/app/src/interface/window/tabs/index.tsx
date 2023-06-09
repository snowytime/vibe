import React, { Fragment, useEffect } from "react";
import { useDomRef } from "@snowytime/react-magic/hooks";
import { Transition } from "@snowytime/react-magic/components";
import { useTabs } from "./use-tabs";
import { Tab, Tabs } from "../../ui/tabs";
import { useSettings } from "../../../internals/settings";

import styles from "./styles.module.scss";
import { useRegistry } from "../../../internals/manager";

export const TabSection = () => {
    const [tabRef, setTabRef] = useDomRef<HTMLDivElement>();
    const { dragProps, wrapperProps } = useTabs(tabRef);
    const { panels } = useRegistry();

    const { tabOpen, tabHeight, updateTab, selectedTab } = useSettings();

    return (
        <Transition
            as={Fragment}
            show={tabOpen}
            enter={styles.transition}
            leave={styles.transition}
            enterFrom={styles.close}
            enterTo={styles.open}
            leaveFrom={styles.open}
            leaveTo={styles.close}
        >
            <div
                ref={setTabRef}
                className={styles.utilities}
                style={{ height: tabOpen ? `${tabHeight}px` : "" }}
                {...wrapperProps}
            >
                <div className={styles.scroller} {...dragProps} />
                <div className={styles.util_tabs}>
                    <Tabs selected={selectedTab} onChange={(val) => updateTab(val)}>
                        {panels.map((panel) => (
                            <Tab value={panel.name} key={panel.id}>
                                {panel.panelHeader ? (
                                    <>{panel.panelHeader}</>
                                ) : (
                                    <div className={styles.tab}>{panel.name}</div>
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
                <div className={styles.content}>
                    {panels.map((panel) => (
                        <>{panel?.panel && panel.name === selectedTab && panel.panel}</>
                    ))}
                </div>
            </div>
        </Transition>
    );
};
