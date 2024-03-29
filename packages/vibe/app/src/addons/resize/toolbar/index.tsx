import React, { useCallback, useEffect, useState } from "react";
import { useResize } from "../use-resize";
import styles from "./styles.module.scss";
import { Input, InputSize } from "../../../interface/ui";

// Icon
export const Icon = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => (
    <div
        className={styles.addon}
        data-enabled={enabled}
        onClick={onClick}
        role='button'
        tabIndex={0}
    >
        <svg width='65%' viewBox='0 0 19 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M2.10507 8H16.8949C17.594 8 18.1197 7.83272 18.4718 7.49815C18.8239 7.16359 19 6.66913 19 6.01476V1.98524C19 1.33087 18.8213 0.836408 18.464 0.501845C18.1119 0.167282 17.5863 0 16.8872 0H2.0973C1.40338 0 0.880349 0.167282 0.528209 0.501845C0.17607 0.836408 0 1.33087 0 1.98524V6.01476C0 6.66913 0.17607 7.16359 0.528209 7.49815C0.885527 7.83272 1.41115 8 2.10507 8ZM2.2915 6.81181C1.96007 6.81181 1.70373 6.72571 1.52249 6.55351C1.34124 6.3813 1.25061 6.13038 1.25061 5.80074V2.19926C1.25061 1.8647 1.34124 1.61378 1.52249 1.44649C1.70373 1.27429 1.96266 1.18819 2.29926 1.18819H16.7007C17.0322 1.18819 17.2885 1.27429 17.4697 1.44649C17.651 1.61378 17.7416 1.8647 17.7416 2.19926V5.80074C17.7416 6.13038 17.651 6.3813 17.4697 6.55351C17.2885 6.72571 17.0296 6.81181 16.693 6.81181H2.2915ZM3.16149 7.15129H3.9072V0.848709H3.16149V7.15129ZM15.0928 7.15129H15.8385V0.848709H15.0928V7.15129ZM9.5 4.33948C10.282 4.33948 10.9811 4.19434 11.5973 3.90406C12.2135 3.61378 12.7107 3.20787 13.0887 2.68635C13.4667 2.1599 13.6842 1.54736 13.7412 0.848709H12.9101C12.8686 1.41451 12.6951 1.90898 12.3896 2.3321C12.0893 2.75523 11.6879 3.08487 11.1856 3.32103C10.6885 3.55228 10.1266 3.6679 9.5 3.6679C8.8734 3.6679 8.30894 3.55228 7.80662 3.32103C7.30948 3.08487 6.90815 2.75523 6.60262 2.3321C6.30226 1.90898 6.12878 1.41451 6.08217 0.848709H5.25102C5.31316 1.54736 5.53325 2.1599 5.91128 2.68635C6.28932 3.20787 6.78645 3.61378 7.4027 3.90406C8.02412 4.19434 8.72322 4.33948 9.5 4.33948ZM9.5 2.57565C10.0282 2.57565 10.4684 2.43296 10.8205 2.1476C11.1778 1.85732 11.3772 1.47355 11.4186 0.99631H7.58136C7.62279 1.47355 7.81957 1.85732 8.17171 2.1476C8.52903 2.43296 8.97179 2.57565 9.5 2.57565Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.3'
            />
        </svg>
    </div>
);

const WidthIcon = () => (
    <div className={styles.width_icon}>
        <svg viewBox='0 0 24 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M9.91064 7.85402C9.91064 7.64361 9.84494 7.47265 9.71354 7.34114C9.58739 7.20963 9.42181 7.14387 9.21682 7.14387H3.83968L2.2707 7.19911L4.87254 4.68201C4.94087 4.61362 4.9908 4.53472 5.02234 4.44529C5.05388 4.35587 5.06965 4.26644 5.06965 4.17701C5.06965 3.97712 5.00131 3.81405 4.86465 3.6878C4.73325 3.55629 4.5703 3.49053 4.37582 3.49053C4.28121 3.49053 4.18922 3.50894 4.09987 3.54577C4.01051 3.58259 3.92641 3.64045 3.84757 3.71936L0.244415 7.31746C0.170828 7.39637 0.110381 7.48054 0.0630749 7.56996C0.021025 7.65939 0 7.75408 0 7.85402C0 7.94871 0.021025 8.04077 0.0630749 8.13019C0.110381 8.21962 0.170828 8.30379 0.244415 8.38269L3.84757 11.9808C3.92641 12.0597 4.01051 12.1176 4.09987 12.1544C4.18922 12.1912 4.28121 12.2096 4.37582 12.2096C4.5703 12.2096 4.73325 12.1465 4.86465 12.0203C5.00131 11.8887 5.06965 11.723 5.06965 11.5231C5.06965 11.4285 5.05388 11.3364 5.02234 11.247C4.9908 11.1575 4.94087 11.0813 4.87254 11.0181L2.2707 8.50894L3.83968 8.55629H9.21682C9.42181 8.55629 9.58739 8.49053 9.71354 8.35902C9.84494 8.22751 9.91064 8.05918 9.91064 7.85402ZM12 15.5C12.205 15.5 12.3732 15.4342 12.5046 15.3027C12.636 15.1712 12.7017 15.0029 12.7017 14.7977V1.18648C12.7017 0.986586 12.636 0.823514 12.5046 0.697265C12.3732 0.565755 12.205 0.5 12 0.5C11.795 0.5 11.6242 0.565755 11.4875 0.697265C11.3561 0.823514 11.2904 0.986586 11.2904 1.18648V14.7977C11.2904 15.0029 11.3561 15.1712 11.4875 15.3027C11.6242 15.4342 11.795 15.5 12 15.5ZM14.0894 7.85402C14.0894 8.05918 14.1524 8.22751 14.2786 8.35902C14.41 8.49053 14.5782 8.55629 14.7832 8.55629H20.1524L21.7293 8.50894L19.1275 11.0181C19.0591 11.0813 19.0092 11.1575 18.9777 11.247C18.9461 11.3364 18.9304 11.4285 18.9304 11.5231C18.9304 11.723 18.9961 11.8887 19.1275 12.0203C19.2589 12.1465 19.4218 12.2096 19.6163 12.2096C19.7162 12.2096 19.8108 12.1912 19.9001 12.1544C19.9895 12.1176 20.0736 12.0597 20.1524 11.9808L23.7556 8.38269C23.8292 8.30379 23.887 8.21962 23.929 8.13019C23.9763 8.04077 24 7.94871 24 7.85402C24 7.75408 23.9763 7.65939 23.929 7.56996C23.887 7.48054 23.8292 7.39637 23.7556 7.31746L20.1524 3.71936C20.0736 3.64045 19.9895 3.58259 19.9001 3.54577C19.8108 3.50894 19.7162 3.49053 19.6163 3.49053C19.4218 3.49053 19.2589 3.55629 19.1275 3.6878C18.9961 3.81405 18.9304 3.97712 18.9304 4.17701C18.9304 4.26644 18.9461 4.35587 18.9777 4.44529C19.0092 4.53472 19.0591 4.61362 19.1275 4.68201L21.7293 7.19911L20.1524 7.14387H14.7832C14.5782 7.14387 14.41 7.20963 14.2786 7.34114C14.1524 7.47265 14.0894 7.64361 14.0894 7.85402Z'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='0.3'
            />
        </svg>
    </div>
);

const HeightIcon = () => (
    <div className={styles.height_icon}>
        <svg viewBox='0 0 15 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M7.50402 8.46054C7.71314 8.46054 7.88472 8.39673 8.01877 8.2691C8.15281 8.13616 8.21984 7.96334 8.21984 7.75063V4.38455L8.17158 2.73342L10.3029 4.99076C10.3727 5.06521 10.4504 5.11839 10.5362 5.15029C10.6273 5.17688 10.7212 5.19018 10.8177 5.19018C11.0214 5.19018 11.1877 5.12371 11.3164 4.99076C11.4504 4.85782 11.5174 4.69298 11.5174 4.49622C11.5174 4.39519 11.496 4.30213 11.4531 4.21704C11.4155 4.12664 11.3566 4.04156 11.2761 3.9618L8.0429 0.739295C7.96783 0.65953 7.88204 0.601036 7.78552 0.563812C7.69437 0.521271 7.60054 0.5 7.50402 0.5C7.40214 0.5 7.30563 0.521271 7.21448 0.563812C7.12332 0.601036 7.04021 0.65953 6.96515 0.739295L3.7319 3.9618C3.65147 4.04156 3.58981 4.12664 3.54692 4.21704C3.50938 4.30213 3.49062 4.39519 3.49062 4.49622C3.49062 4.69298 3.55496 4.85782 3.68365 4.99076C3.81769 5.12371 3.9866 5.19018 4.19035 5.19018C4.28686 5.19018 4.37802 5.17688 4.46381 5.15029C4.55496 5.11839 4.63539 5.06521 4.70509 4.99076L6.83646 2.73342L6.78016 4.38455V7.75063C6.78016 7.96334 6.84718 8.13616 6.98123 8.2691C7.12064 8.39673 7.29491 8.46054 7.50402 8.46054ZM0 10C0 10.2074 0.0643432 10.3776 0.193029 10.5105C0.327078 10.6434 0.498659 10.7099 0.707775 10.7099H14.3003C14.504 10.7099 14.6702 10.6434 14.7989 10.5105C14.933 10.3776 15 10.2074 15 10C15 9.79261 14.933 9.62245 14.7989 9.4895C14.6702 9.35124 14.504 9.28212 14.3003 9.28212H0.707775C0.498659 9.28212 0.327078 9.35124 0.193029 9.4895C0.0643432 9.62245 0 9.79261 0 10ZM7.50402 11.5315C7.29491 11.5315 7.12064 11.598 6.98123 11.7309C6.84718 11.8638 6.78016 12.034 6.78016 12.2414V15.6154L6.83646 17.2586L4.70509 15.0013C4.63539 14.9268 4.55496 14.8763 4.46381 14.8497C4.37802 14.8178 4.28686 14.8018 4.19035 14.8018C3.9866 14.8018 3.81769 14.8683 3.68365 15.0013C3.55496 15.1342 3.49062 15.299 3.49062 15.4958C3.49062 15.5968 3.50938 15.6926 3.54692 15.783C3.58981 15.868 3.65147 15.9531 3.7319 16.0382L6.96515 19.2527C7.04021 19.3325 7.12332 19.3936 7.21448 19.4362C7.30563 19.4787 7.40214 19.5 7.50402 19.5C7.60054 19.5 7.69437 19.4787 7.78552 19.4362C7.88204 19.3936 7.96783 19.3325 8.0429 19.2527L11.2761 16.0382C11.3566 15.9531 11.4155 15.868 11.4531 15.783C11.496 15.6926 11.5174 15.5968 11.5174 15.4958C11.5174 15.299 11.4504 15.1342 11.3164 15.0013C11.1877 14.8683 11.0214 14.8018 10.8177 14.8018C10.7212 14.8018 10.6273 14.8178 10.5362 14.8497C10.4504 14.8763 10.3727 14.9268 10.3029 15.0013L8.17158 17.2586L8.21984 15.6154V12.2414C8.21984 12.034 8.15281 11.8638 8.01877 11.7309C7.88472 11.598 7.71314 11.5315 7.50402 11.5315Z'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='0.3'
            />
        </svg>
    </div>
);

export const Toolbar = () => {
    const { enabled, toggleEnabled } = useResize();

    return (
        <div className={styles.slot}>
            <Icon enabled={enabled} onClick={toggleEnabled} />
            {enabled ? (
                <div className={styles.inner}>
                    <WidthInput />
                    <HeightInput />
                    {/* <WidthInput />
                <HeightInput /> */}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

const WidthInput = () => {
    const { width, updateWidth } = useResize();
    const [internalWidth, setInternalWidth] = useState(width);

    useEffect(() => {
        setInternalWidth(width);
    }, [width]);

    const saveEvent = useCallback(
        (value: string) => {
            if (internalWidth !== width) {
                updateWidth(Number(value));
            }
        },
        [internalWidth, updateWidth, width],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            if (e.key === "Escape") {
                target.blur();
            }
            if (e.key === "Enter") {
                saveEvent(target.value);
            }
        },
        [saveEvent],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const parsedNumber = Number(inputValue);

        if (isNaN(parsedNumber)) {
            return;
        }

        setInternalWidth(parsedNumber);
    };

    return (
        <Input
            type='text'
            size={InputSize.tiny}
            prefix={<WidthIcon />}
            suffix='px'
            placeholder='width'
            value={internalWidth}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={() => setInternalWidth(width)}
            width='120px'
        />
    );
};

const HeightInput = () => {
    const { height, updateHeight } = useResize();
    const [internalHeight, setInternalHeight] = useState(height);

    useEffect(() => {
        setInternalHeight(height);
    }, [height]);

    const saveEvent = useCallback(
        (value: string) => {
            if (internalHeight !== height) {
                updateHeight(Number(value));
            }
        },
        [height, internalHeight, updateHeight],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            if (e.key === "Escape") {
                target.blur();
            }
            if (e.key === "Enter") {
                saveEvent(target.value);
            }
        },
        [saveEvent],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const parsedNumber = Number(inputValue);

        if (isNaN(parsedNumber)) {
            return;
        }

        setInternalHeight(parsedNumber);
    };

    return (
        <Input
            type='text'
            size={InputSize.tiny}
            prefix={<HeightIcon />}
            suffix='px'
            placeholder='width'
            value={internalHeight}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={() => setInternalHeight(height)}
            width='120px'
        />
    );
};
