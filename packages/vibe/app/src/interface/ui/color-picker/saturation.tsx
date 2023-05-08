import React from "react";

import { Interaction, Interactive } from "./interactive";
import { Thumb } from "./thumb";
import { HsvaColor, clamp, hsvaToHslString } from "./helpers";

interface Props {
    hsva: HsvaColor;
    onChange: (newColor: { s: number; v: number }) => void;
}

const SaturationBase = ({ hsva, onChange }: Props) => {
    const handleMove = (interaction: Interaction) => {
        onChange({
            s: interaction.left * 100,
            v: 100 - interaction.top * 100,
        });
    };

    const handleKey = (offset: Interaction) => {
        // Saturation and brightness always fit into [0, 100] range
        onChange({
            s: clamp(hsva.s + offset.left * 100, 0, 100),
            v: clamp(hsva.v - offset.top * 100, 0, 100),
        });
    };

    const containerStyle = {
        backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
    };

    return (
        <div className='react-colorful__saturation' style={containerStyle}>
            <Interactive onMove={handleMove} onKey={handleKey} aria-label='Color'>
                <Thumb top={1 - hsva.v / 100} left={hsva.s / 100} color={hsvaToHslString(hsva)} />
            </Interactive>
        </div>
    );
};

export const Saturation = React.memo(SaturationBase);
