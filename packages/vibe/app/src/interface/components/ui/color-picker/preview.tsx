import React, { useCallback, useMemo, useState } from "react";
import { HsvaColor, hsvaToHex, hsvaToHsla, hsvaToHslaString, hsvaToRgba, round } from "./helpers";

type Props = {
    hsva: HsvaColor;
};
export const Preview = ({ hsva }: Props) => {
    const formats = useMemo(() => ["hsva", "hsla", "rgba", "hex"], []);
    const [format, setFormat] = useState(formats[0]);
    const switchFormat = useCallback(() => {
        const currentIndex = formats.indexOf(format);
        if (currentIndex === formats.length - 1) {
            setFormat(formats[0]);
        } else {
            setFormat(formats[currentIndex + 1]);
        }
    }, [format, formats]);
    const computeDisplay = useCallback(() => {
        if (format === "rgba") {
            const rgba = hsvaToRgba(hsva);
            const arr = Object.entries(rgba).map(([key, value]) => ({ key, value }));
            return arr;
        }
        if (format === "hsva") {
            return Object.entries(hsva).map(([key, value]) => ({ key, value }));
        }
        if (format === "hsla") {
            const hsla = hsvaToHsla(hsva);
            const arr = Object.entries(hsla).map(([key, value]) => ({ key, value }));
            return arr;
        }
        if (format === "hex") {
            const hex = hsvaToHex(hsva);
            const arr = [
                { key: "hex", value: hex },
                { key: "a", value: hsva.a },
            ];
            return arr;
        }
    }, [format, hsva]);

    return (
        <div className='vibe--preview'>
            <div className='vibe--color-preview'>
                <div style={{ backgroundColor: hsvaToHslaString(hsva) }} />
            </div>
            <div className='vibe--color-summary'>
                <div
                    className='vibe--color-summary-top'
                    onClick={switchFormat}
                    role='button'
                    tabIndex={0}
                >
                    {computeDisplay().map((item, index) => (
                        <div className='vibe--color-title' key={index}>
                            {item.key.toUpperCase()}
                        </div>
                    ))}
                </div>
                <div className='vibe--color-line'>
                    {computeDisplay().map((item, index) => {
                        return (
                            <input
                                value={item.key === "a" ? round(item.value, 2) : round(item.value)}
                                step='0'
                                className='vibe--color-line-input'
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
