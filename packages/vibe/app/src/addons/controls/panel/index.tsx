import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import {
    useControls,
    ControlType,
    StringControl,
    BooleanControl,
    RadioControl,
} from "../use-controls";
import {
    Input,
    InputSize,
    Loader,
    Checkbox,
    TextArea,
    Toggle,
    RadioGroup,
    Radio,
    Switch,
    Empty,
} from "../../../interface/ui";

export const Panel = () => {
    const { controls, loading, enabled } = useControls();
    const mappedControls = useMemo(() => {
        const controlValues = Object.values(controls);
        if (!controlValues.length) return null;
        return controlValues;
    }, [controls]);
    return (
        <div className={styles.inner}>
            <div className={styles.container}>
                {loading && (
                    <div className={styles.loading}>
                        <Loader />
                    </div>
                )}
                {mappedControls ? (
                    mappedControls.map((control, i) => {
                        let elem: React.ReactNode;
                        switch (control.type) {
                            case ControlType.text: {
                                elem = <TextControlElem control={control} />;
                                break;
                            }
                            case ControlType.textarea: {
                                elem = <TextAreaElem control={control} />;
                                break;
                            }
                            case ControlType.check: {
                                elem = <CheckboxControlElem control={control} />;
                                break;
                            }
                            case ControlType.toggle: {
                                elem = <ToggleControlElem control={control} />;
                                break;
                            }
                            case ControlType.switch: {
                                elem = <SwitchControlElem control={control} />;
                                break;
                            }
                            case ControlType.radio: {
                                elem = <RadioControlElem control={control} />;
                                break;
                            }
                            default: {
                                elem = <></>;
                                break;
                            }
                        }

                        return (
                            <div key={i} className={styles.control}>
                                {elem}
                            </div>
                        );
                    })
                ) : (
                    <Empty name='Controls' />
                )}
            </div>
        </div>
    );
};

const TextControlElem = ({ control }: { control: StringControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <Input
                size={InputSize.small}
                label={control.name}
                value={control.value}
                onChange={(e) => {
                    updateControl(control.name, e.target.value);
                }}
            />
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};

const TextAreaElem = ({ control }: { control: StringControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <TextArea
                label={control.name}
                value={control.value}
                onChange={(e) => {
                    updateControl(control.name, e.target.value);
                }}
            />
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};

const CheckboxControlElem = ({ control }: { control: BooleanControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <Checkbox
                label={control.name}
                checked={!!control.value}
                onChange={(e) => {
                    updateControl(control.name, e.target.checked);
                }}
            >
                {control.name}
            </Checkbox>
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};

const ToggleControlElem = ({ control }: { control: BooleanControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <Toggle
                label={control.name}
                checked={!!control.value}
                onChange={(e) => {
                    updateControl(control.name, e.target.checked);
                }}
            />
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};

const SwitchControlElem = ({ control }: { control: BooleanControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <Switch
                // disabled
                selected={control.value}
                onChange={(val) => updateControl(control.name, val)}
                label={control.name}
            >
                <Switch.Slot value={true}>True</Switch.Slot>
                <Switch.Slot value={false}>False</Switch.Slot>
            </Switch>
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};

const RadioControlElem = ({ control }: { control: RadioControl }) => {
    const { updateControl } = useControls();
    return (
        <>
            <RadioGroup
                label={control.name}
                value={control.value}
                onChange={(state) => updateControl(control.name, state)}
            >
                {control.options.map((option, i) => (
                    <Radio key={i} value={option}>
                        {option}
                    </Radio>
                ))}
            </RadioGroup>
            {control.description ? (
                <div className={styles.description}>{control.description}</div>
            ) : null}
        </>
    );
};
