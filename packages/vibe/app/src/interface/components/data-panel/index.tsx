import React, { Fragment, useMemo } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Action, useVibe } from "../../../context/index.js";

import "./styles.scss";
// import { ColorPicker } from "../ui/color-picker";

import styles from "./styles.module.scss";

export const DataPanel = () => {
    const { watcherPanel, addons, dispatch } = useVibe();
    // const [color, setColor] = useState("#5bda1b");

    const enabledAddons = useMemo(() => {
        return Object.entries(addons)
            .filter(([key, value]) => value.enabled)
            .map(([key]) => key);
    }, [addons]);

    const setSelected = (state: string) =>
        dispatch({
            type: Action.set_watcher_selected,
            payload: { selected: state },
        });

    const randomize = () => {
        function generateRandomString() {
            let result = "";
            const characters = "abcdefghijklmnopqrstuvwxyz";

            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }

            return result;
        }

        dispatch({
            type: Action.set_addon_controls_update,
            payload: {
                name: "name",
                value: generateRandomString(),
            },
        });
    };

    return (
        <Transition
            show={watcherPanel.open}
            as={Fragment}
            enter='vibe__data_panel_transition'
            leave='vibe__data_panel_transition'
            enterFrom='vibe__data_panel_close'
            enterTo='vibe__data_panel_open'
            leaveFrom='vibe__data_panel_open'
            leaveTo='vibe__data_panel_close'
        >
            <div className='vibe__data_panel'>
                <div className='vibe__data_panel_inner'>
                    <div className={styles.nav}>
                        <div className={styles.nav_inner}>
                            {enabledAddons.map((addon, key) => {
                                return (
                                    <div
                                        key={key}
                                        className={styles.nav_tab}
                                        onClick={() => setSelected(addon)}
                                        role='button'
                                        data-selected={watcherPanel.selected === addon}
                                        tabIndex={0}
                                    >
                                        {addon}

                                        <div
                                            className={styles.nav_tab_indicator}
                                            data-selected={watcherPanel.selected === addon}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <pre>{enabledAddons}</pre>
                    <button onClick={randomize}>randomize</button>
                </div>
            </div>
        </Transition>
    );
};
