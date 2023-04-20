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
import { Note, NoteVariant } from "../ui/note/index.js";
import { Tab, Tabs } from "../ui/tabs/index.js";
import { TextArea } from "../ui/textarea/index.js";
import { Loader } from "../ui/loader";
import { Progress, ProgressOrientation, ProgressVariant } from "../ui/progress/index.js";
import { Cardinal, CardinalSize } from "../ui/cardinal/index.js";
import { Link } from "../ui/link/index.js";

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

    const [tab, setTab] = useState("apples");
    const [textarea, setTextarea] = useState("");
    const [progress, setProgress] = useState(0);

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
                                // disabled
                                block
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
                        <div
                            style={{
                                margin: "50px",
                                display: "flex",
                                gap: "12px",
                                flexDirection: "column",
                            }}
                        >
                            Normal Variants
                            <Note variant={NoteVariant.primary}>Primary variant</Note>
                            <Note variant={NoteVariant.secondary}>Secondary variant</Note>
                            <Note variant={NoteVariant.error}>Error variant</Note>
                            <Note variant={NoteVariant.warning}>Warning variant</Note>
                            <Note variant={NoteVariant.success}>Success variant</Note>
                            Filled Variants
                            <Note variant={NoteVariant.primary} filled>
                                Primary variant
                            </Note>
                            <Note variant={NoteVariant.secondary} filled>
                                Secondary variant
                            </Note>
                            <Note variant={NoteVariant.error} filled>
                                Error variant
                            </Note>
                            <Note variant={NoteVariant.warning} filled>
                                Warning variant
                            </Note>
                            <Note variant={NoteVariant.success} filled>
                                Success variant
                            </Note>
                            Contrast Variants
                            <Note variant={NoteVariant.primary} contrast>
                                Primary variant
                            </Note>
                            <Note variant={NoteVariant.secondary} contrast>
                                Secondary variant
                            </Note>
                            <Note variant={NoteVariant.error} contrast>
                                Error variant
                            </Note>
                            <Note variant={NoteVariant.warning} contrast>
                                Warning variant
                            </Note>
                            <Note variant={NoteVariant.success} contrast>
                                Success variant
                            </Note>
                        </div>

                        <div style={{ margin: "50px" }}>
                            <Tabs selected={tab} onChange={setTab}>
                                <Tab value='apples'>Apples</Tab>
                                <Tab value='oranges'>
                                    <svg
                                        style={{ overflow: "visible" }}
                                        viewBox='0 0 13 18'
                                        height='14'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M7.3717 17.5C8.49683 17.5 9.48132 17.2549 10.3252 16.7647C11.169 16.2799 11.8245 15.5851 12.2915 14.6801C12.7638 13.7698 13 12.6844 13 11.424V9.65447C13 8.72798 12.793 8.00349 12.3791 7.48099C11.9704 6.95849 11.3946 6.69455 10.6516 6.68916C10.5613 6.3929 10.3995 6.16128 10.1659 5.9943C9.93774 5.82193 9.65646 5.73574 9.3221 5.73574C9.09389 5.73574 8.86037 5.77614 8.62155 5.85694C8.52071 5.52836 8.34558 5.2725 8.09614 5.08935C7.8467 4.90082 7.54949 4.80656 7.20452 4.80656C7.01346 4.80656 6.82506 4.83349 6.63931 4.88736V2.19677C6.63931 1.68504 6.48805 1.27567 6.18554 0.968631C5.88834 0.65621 5.50356 0.5 5.03122 0.5C4.55888 0.5 4.1688 0.65621 3.86098 0.968631C3.55847 1.27567 3.40721 1.68504 3.40721 2.19677V8.93536C3.40721 8.98384 3.38864 9.00808 3.35149 9.00808C3.31965 9.00808 3.29576 8.98923 3.27984 8.95152L2.75443 7.66682C2.62175 7.34902 2.4413 7.10932 2.21309 6.94772C1.99019 6.78074 1.7381 6.69724 1.45681 6.69724C1.06939 6.69724 0.729742 6.81844 0.437845 7.06084C0.145948 7.29784 0 7.6372 0 8.0789C0 8.20279 0.0106144 8.34015 0.0318433 8.49097C0.0583793 8.64179 0.0955298 8.78723 0.143295 8.92728L1.54438 12.9268C2.0751 14.4458 2.82873 15.5878 3.80526 16.3527C4.78178 17.1176 5.9706 17.5 7.3717 17.5ZM7.41151 16.385C6.3023 16.385 5.33108 16.0941 4.49785 15.5124C3.66461 14.936 3.00387 13.9583 2.5156 12.5794L1.10654 8.59601C1.06408 8.47212 1.04285 8.34823 1.04285 8.22433C1.04285 8.08428 1.09062 7.96309 1.18615 7.86074C1.28168 7.7584 1.40905 7.70722 1.56827 7.70722C1.8124 7.70722 1.99284 7.85266 2.1096 8.14354L3.20023 10.5998C3.28515 10.8045 3.38599 10.9472 3.50274 11.028C3.62481 11.1035 3.75749 11.1412 3.90079 11.1412C4.06531 11.1412 4.20064 11.0819 4.30679 10.9634C4.41293 10.8395 4.466 10.686 4.466 10.5029V2.12405C4.466 1.95168 4.51908 1.81163 4.62522 1.7039C4.73136 1.59617 4.8667 1.5423 5.03122 1.5423C5.19574 1.5423 5.32842 1.59617 5.42926 1.7039C5.5301 1.81163 5.58052 1.95168 5.58052 2.12405V8.10314C5.58052 8.24319 5.63094 8.36169 5.73177 8.45865C5.83261 8.55561 5.95202 8.60409 6.09001 8.60409C6.228 8.60409 6.34476 8.55561 6.44029 8.45865C6.54112 8.36169 6.59154 8.24319 6.59154 8.10314V5.9539C6.74014 5.87849 6.89936 5.84078 7.06919 5.84078C7.26556 5.84078 7.41947 5.90272 7.53092 6.02662C7.64768 6.15051 7.70606 6.32018 7.70606 6.53565V8.41017C7.70606 8.56099 7.75647 8.68219 7.85731 8.77376C7.96346 8.86534 8.08287 8.91112 8.21555 8.91112C8.34823 8.91112 8.46499 8.86534 8.56582 8.77376C8.66666 8.68219 8.71708 8.56099 8.71708 8.41017V6.88308C8.86568 6.81305 9.02224 6.77804 9.18677 6.77804C9.38844 6.77804 9.545 6.83999 9.65646 6.96388C9.76791 7.08238 9.82363 7.24937 9.82363 7.46483V8.72528C9.82363 8.87072 9.87405 8.98923 9.97489 9.0808C10.081 9.17237 10.2031 9.21816 10.3411 9.21816C10.4685 9.21816 10.5826 9.17237 10.6834 9.0808C10.7842 8.98923 10.8347 8.87072 10.8347 8.72528V7.7961C11.1902 7.7961 11.4636 7.97386 11.6546 8.32937C11.851 8.6795 11.9492 9.17506 11.9492 9.81606V11.2947C11.9492 12.3774 11.7661 13.2985 11.3999 14.058C11.039 14.8121 10.5189 15.3885 9.83955 15.7871C9.16023 16.1857 8.35088 16.385 7.41151 16.385Z'
                                            fill='hsl(var(--foreground))'
                                        />
                                    </svg>
                                    Oranges
                                </Tab>
                                <Tab value='grapes'>Grapes</Tab>
                            </Tabs>
                        </div>
                        <Loader />
                        <div style={{ margin: "50px" }}>
                            <TextArea
                                // disabled
                                error={!textarea.length}
                                errorMessage='hmmm something doesnt look right'
                                value={textarea}
                                onChange={(e) => setTextarea(e.target.value)}
                                label='Your story'
                                placeholder='It all began...'
                            />
                        </div>
                        <div style={{ margin: "50px" }}>
                            <Progress
                                color='hsl(var(--green-500))'
                                // orientation={ProgressOrientation.vertical}
                                progress={progress}
                            />
                            <Progress
                                color='hsl(var(--blue-500))'
                                variant={ProgressVariant.circle}
                                // orientation={ProgressOrientation.vertical}
                                progress={progress}
                            />
                            <button onClick={() => setProgress((s) => (s += 10))}>increase</button>
                        </div>
                        <div style={{ margin: "50px" }}>
                            <Cardinal
                                color='hsl(var(--green-500))'
                                singular='Customer'
                                plural='Customers'
                                count={62}
                                size={CardinalSize.default}
                            />
                        </div>
                        <div style={{ margin: "50px" }}>
                            <p>
                                Lorem ipsum some other shit{" "}
                                <Link href='/'>
                                    explore
                                    <Chevron />
                                </Link>{" "}
                                and some other crap.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

const Chevron = () => (
    <svg
        height='0.75em'
        style={{ marginTop: "1px" }}
        viewBox='0 0 8 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M8 7C8 6.89785 7.97819 6.80376 7.93456 6.71774C7.89639 6.62634 7.83913 6.54301 7.76278 6.46774L1.28425 0.209677C1.13701 0.0698925 0.957055 0 0.744376 0C0.608044 0 0.482618 0.0322581 0.368098 0.0967742C0.253579 0.16129 0.163599 0.25 0.0981595 0.362903C0.0327198 0.47043 0 0.594086 0 0.733871C0 0.932796 0.070893 1.10753 0.212679 1.25806L6.16769 7L0.212679 12.7419C0.070893 12.8925 0 13.0672 0 13.2661C0 13.4059 0.0327198 13.5296 0.0981595 13.6371C0.163599 13.75 0.253579 13.8387 0.368098 13.9032C0.482618 13.9677 0.608044 14 0.744376 14C0.957055 14 1.13701 13.9274 1.28425 13.7823L7.76278 7.53226C7.83913 7.45699 7.89639 7.37634 7.93456 7.29032C7.97819 7.19892 8 7.10215 8 7Z'
            fill='currentColor'
        />
    </svg>
);
