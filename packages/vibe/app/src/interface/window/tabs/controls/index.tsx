import React, { useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import { useControls, Control } from "../../../../controls/use-controls";
import { Input, InputSize } from "../../../ui/input";
import { Loader } from "../../../ui/loader";
import { Checkbox } from "../../../ui/checkbox";
import { Radio, RadioGroup } from "../../../ui/radio";

export const Controls = () => {
    const { controls, updateControl, loading } = useControls();
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
                    case "text": {
                        return <TextControl key={i} control={control} />;
                    }
                    case "check": {
                        return <CheckboxControl key={i} control={control} />;
                    }
                    case "radio": {
                        return <RadioControl key={i} control={control} />;
                    }
                    default: {
                        return <></>;
                    }
                }
            })}
        </div>
    );
};

const TextControl = ({ control }: { control: Control }) => {
    const { updateControl } = useControls();
    return (
        <Input
            size={InputSize.small}
            label={control.name}
            value={control.value}
            onChange={(e) => {
                updateControl(control.name, e.target.value);
            }}
        />
    );
};

const CheckboxControl = ({ control }: { control: Control }) => {
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

const RadioControl = ({ control }: { control: Control }) => {
    const { updateControl } = useControls();
    return (
        <RadioGroup value={control.value} onChange={(state) => updateControl(control.name, state)}>
            {control.options.map((option) => (
                <Radio value={option}>{option}</Radio>
            ))}
        </RadioGroup>
    );
};
