import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import {
    useControls,
    ControlType,
    TextControl,
    CheckboxControl,
    RadioControl,
} from "../../../../controls/use-controls";
import { Input, InputSize } from "../../../ui/input";
import { Loader } from "../../../ui/loader";
import { Checkbox } from "../../../ui/checkbox";
import { Radio, RadioGroup } from "../../../ui/radio";
import { Toggle } from "../../../ui/toggle";

export const Controls = () => {
    const { controls, loading } = useControls();
    const mappedControls = useMemo(() => Object.values(controls), [controls]);
    return (
        <div className={styles.container}>
            {loading && (
                <div className={styles.loading}>
                    <Loader />
                </div>
            )}
            {mappedControls.map((control, i) => {
                switch (control.type) {
                    case ControlType.text: {
                        return <TextControlElem key={i} control={control} />;
                    }
                    case ControlType.check: {
                        return <CheckboxControlElem key={i} control={control} />;
                    }
                    case ControlType.toggle: {
                        return <ToggleControlElem key={i} control={control} />;
                    }
                    case ControlType.radio: {
                        return <RadioControlElem key={i} control={control} />;
                    }
                    default: {
                        return <></>;
                    }
                }
            })}
        </div>
    );
};

const TextControlElem = ({ control }: { control: TextControl }) => {
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
            {control.description ? <p>{control.description}</p> : null}
        </>
    );
};

const CheckboxControlElem = ({ control }: { control: CheckboxControl }) => {
    const { updateControl } = useControls();
    return (
        <Checkbox
            label={control.name}
            checked={!!control.value}
            onChange={(e) => {
                updateControl(control.name, e.target.checked);
            }}
        >
            {control.name}
        </Checkbox>
    );
};

const ToggleControlElem = ({ control }: { control: CheckboxControl }) => {
    const { updateControl } = useControls();
    return (
        <Toggle
            label={control.name}
            checked={!!control.value}
            onChange={(e) => {
                updateControl(control.name, e.target.checked);
            }}
        />
    );
};

const RadioControlElem = ({ control }: { control: RadioControl }) => {
    const { updateControl } = useControls();
    return (
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
    );
};
