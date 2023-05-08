import React from "react";

import "./styles.scss";
import { Saturation } from "./saturation";
import { useColorManipulation } from "./useColor";
import { equalHex, hexToHsva, hsvaToHex } from "./helpers";
import { Hue } from "./hue";
import { Alpha } from "./alpha";
import { Preview } from "./preview";

type Props = {
    color: string;
    onChange: (c: string) => void;
};
export const ColorPicker = ({ color, onChange }: Props) => {
    const colorModel = {
        defaultColor: "0001",
        toHsva: hexToHsva,
        fromHsva: hsvaToHex,
        equal: equalHex,
    };

    const [hsva, updateHsva] = useColorManipulation(colorModel, color, onChange);

    return (
        <div className='vibe--color-picker'>
            <Saturation hsva={hsva} onChange={updateHsva} />
            <div className='vibe--color-wrapper'>
                <Hue hue={hsva.h} onChange={updateHsva} />
                <Alpha hsva={hsva} onChange={updateHsva} />
                <Preview hsva={hsva} />
            </div>
        </div>
    );
};
