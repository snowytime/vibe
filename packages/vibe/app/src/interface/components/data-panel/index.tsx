import React, { Fragment, useMemo, useState } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Action, useVibe } from "../../../context/index.js";

import "./styles.scss";
// import { ColorPicker } from "../ui/color-picker";

import styles from "./styles.module.scss";
import { useControls } from "../../../context/hooks/use-controls.js";
import { Input, InputSize, TextInput } from "../ui/input/index.js";
import { Checkbox } from "../ui/checkbox/index.js";
import { Radio, RadioGroup } from "../ui/radio/index.js";

export const DataPanel = () => {
    const { watcherPanel, addons, dispatch } = useVibe();
    const { storyControls, update } = useControls();

    const [val, setVal] = useState(false);
    const [radio, setRadio] = useState("");
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
                    <div className={styles.controls}>
                        {storyControls.map(({ name, value, original }, key) => {
                            return (
                                <Input
                                    size={InputSize.small}
                                    label={name}
                                    placeholder={original}
                                    type='text'
                                    value={value}
                                    onChange={(e) => update(name, { value: e.target.value })}
                                    key={key}
                                />
                            );
                        })}
                        <div style={{ margin: "50px" }}>
                            <Checkbox
                                checked={val}
                                // indeterminate
                                label='Some state'
                                error='You must agree before proceeding'
                                onChange={(e) => setVal(e.target.checked)}
                            >
                                Option 1 Option 2
                            </Checkbox>
                        </div>
                        <div style={{ margin: "50px" }}>
                            <RadioGroup value={radio} onChange={setRadio}>
                                {radio}
                                <Radio value='1'>Option 1</Radio>
                                <Radio value='2'>Option 2</Radio>
                                <Radio value='3'>Option 3</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};
