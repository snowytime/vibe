import React, { Fragment } from "react";
import { useDomRef } from "@snowytime/react-magic/hooks";
import { Transition } from "@snowytime/react-magic/components";
import { useTabs } from "./use-tabs";
import { Badge, BadgeVariant } from "../../ui/badge";
import { Tab, Tabs } from "../../ui/tabs";
import { useSettings, useConsole, useControls } from "../../../controls";

import styles from "./styles.module.scss";
import { Design } from "./design";
import { Console } from "./console";
import { Controls } from "./controls";

export const TabSection = () => {
    const [tabRef, setTabRef] = useDomRef<HTMLDivElement>();
    const { dragProps, wrapperProps, dragging } = useTabs(tabRef);

    const { tabOpen, tabHeight, updateTab, selectedTab, story, sidebarOpen } = useSettings();
    const { enabled } = useControls();

    const { log, pending } = useConsole();

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
                    <Tabs selected={selectedTab} onChange={updateTab}>
                        {story.design ? (
                            <Tab value='design'>
                                <div className={styles.tab}>Design</div>
                            </Tab>
                        ) : null}
                        {enabled ? (
                            <Tab value='controls'>
                                <div className={styles.tab}>Controls</div>
                            </Tab>
                        ) : null}
                        <Tab value='console'>
                            <div className={styles.tab}>
                                Console
                                {pending > 0 ? (
                                    <Badge size='small' variant={BadgeVariant.error}>
                                        {pending}
                                    </Badge>
                                ) : null}
                            </div>
                        </Tab>
                        <Tab value='listeners'>
                            <div className={styles.tab}>
                                Listeners
                                <Badge size='small' variant={BadgeVariant.error}>
                                    12
                                </Badge>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className={styles.content}>
                    {selectedTab === "design" ? <Design dragging={dragging} /> : null}
                    {selectedTab === "console" ? <Console log={log} /> : null}
                    {selectedTab === "controls" ? <Controls /> : null}
                    {selectedTab === "listeners" ? <>{"" + sidebarOpen}</> : null}
                </div>
            </div>
        </Transition>
    );
};
