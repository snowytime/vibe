import React from "react";

interface Props {
    top?: number;
    left: number;
    color: string;
}

export const Thumb = ({ color, left, top = 0.5 }: Props): JSX.Element => {
    const style = {
        top: `${top * 100}%`,
        left: `${left * 100}%`,
    };

    return (
        <div style={style} className='vibe--thumb'>
            <div className='vibe--thumb-inner' style={{ backgroundColor: color }} />
        </div>
    );
};
