import React from "react";
import { Interaction, Interactive } from "./interactive";
import { HsvaColor, clamp, hsvaToHslaString, round } from "./helpers";
import { Thumb } from "./thumb";

interface Props {
    hsva: HsvaColor;
    onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = ({ hsva, onChange }: Props): JSX.Element => {
    const handleMove = (interaction: Interaction) => {
        onChange({ a: interaction.left });
    };

    const handleKey = (offset: Interaction) => {
        // Alpha always fit into [0, 1] range
        onChange({ a: clamp(hsva.a + offset.left) });
    };

    // We use `Object.assign` instead of the spread operator
    // to prevent adding the polyfill (about 150 bytes gzipped)
    const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
    const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));

    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
    };

    const ariaValue = round(hsva.a * 100);

    return (
        <div className='vibe--alpha'>
            <div className='vibe--alpha-gradient' style={gradientStyle} />
            <Interactive
                onMove={handleMove}
                onKey={handleKey}
                aria-label='Alpha'
                aria-valuetext={`${ariaValue}%`}
                aria-valuenow={ariaValue}
                aria-valuemin='0'
                aria-valuemax='100'
            >
                <Thumb left={hsva.a} color={hsvaToHslaString(hsva)} />
            </Interactive>
        </div>
    );
};
