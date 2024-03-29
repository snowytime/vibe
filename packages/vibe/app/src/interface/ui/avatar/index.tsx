import React, { HTMLProps, forwardRef, useMemo } from "react";

import styles from "./styles.module.scss";

export enum AvatarSize {
    small = "small",
    default = "default",
    large = "large",
}

const UserIcon = () => (
    <svg viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M1.96337 15H12.0366C13.3455 15 14 14.568 14 13.7041C14 13.1749 13.8397 12.6107 13.5192 12.0113C13.1986 11.412 12.7338 10.8477 12.1248 10.3186C11.5211 9.78402 10.7865 9.34935 9.92101 9.01458C9.06087 8.6798 8.08853 8.51242 7.00401 8.51242C5.91414 8.51242 4.93646 8.6798 4.07098 9.01458C3.21084 9.34935 2.47624 9.78402 1.8672 10.3186C1.2635 10.8477 0.801374 11.412 0.480824 12.0113C0.160275 12.6107 0 13.1749 0 13.7041C0 14.568 0.654455 15 1.96337 15ZM1.58672 13.777C1.47987 13.777 1.4024 13.7608 1.35432 13.7284C1.31158 13.696 1.29021 13.6366 1.29021 13.5502C1.29021 13.2208 1.41309 12.8402 1.65884 12.4082C1.90994 11.9708 2.27857 11.5497 2.76474 11.1447C3.25091 10.7397 3.84927 10.405 4.55982 10.1404C5.27037 9.87041 6.0851 9.73542 7.00401 9.73542C7.92291 9.73542 8.73497 9.87041 9.44018 10.1404C10.1507 10.405 10.7491 10.7397 11.2353 11.1447C11.7214 11.5497 12.0874 11.9708 12.3331 12.4082C12.5842 12.8402 12.7098 13.2208 12.7098 13.5502C12.7098 13.6366 12.6857 13.696 12.6377 13.7284C12.5949 13.7608 12.5228 13.777 12.4213 13.777H1.58672ZM7.00401 7.5081C7.63976 7.5081 8.21942 7.33531 8.74299 6.98974C9.26655 6.64417 9.68327 6.18521 9.99313 5.61285C10.3083 5.0351 10.4659 4.39795 10.4659 3.7014C10.4659 3.01026 10.311 2.38661 10.0011 1.83045C9.69128 1.2689 9.27457 0.823434 8.751 0.49406C8.22744 0.164687 7.64511 0 7.00401 0C6.36825 0 5.78859 0.167387 5.26503 0.50216C4.74146 0.836933 4.32208 1.2851 4.00687 1.84665C3.697 2.40821 3.54207 3.03186 3.54207 3.7176C3.54207 4.40875 3.697 5.0432 4.00687 5.62095C4.32208 6.1933 4.74146 6.65227 5.26503 6.99784C5.78859 7.33801 6.36825 7.5081 7.00401 7.5081ZM7.00401 6.2851C6.614 6.2851 6.25339 6.17171 5.92215 5.94492C5.59626 5.71274 5.33181 5.40227 5.12879 5.0135C4.93112 4.62473 4.83228 4.19276 4.83228 3.7176C4.83228 3.24784 4.93112 2.82667 5.12879 2.4541C5.32646 2.07613 5.58825 1.77646 5.91414 1.55508C6.24537 1.33369 6.60866 1.223 7.00401 1.223C7.40469 1.223 7.76798 1.33099 8.09387 1.54698C8.42511 1.76296 8.68689 2.05994 8.87922 2.43791C9.07689 2.81048 9.17573 3.23164 9.17573 3.7014C9.17573 4.17657 9.07689 4.61123 8.87922 5.0054C8.68155 5.39417 8.4171 5.70464 8.08586 5.93682C7.75997 6.16901 7.39935 6.2851 7.00401 6.2851Z'
            fill='currentColor'
        />
    </svg>
);

type Props = Omit<HTMLProps<HTMLDivElement>, "size"> & {
    src?: string;
    name?: string;
    size?: AvatarSize;
    grouped?: boolean;
};

export const Avatar = forwardRef<HTMLDivElement, Props>(
    ({ name, src, size = AvatarSize.default, grouped, ...rest }, ref) => {
        const computedName = useMemo(() => {
            if (!name) return false;
            const words = name.split(" ");
            const initials = words.map((word) => word[0].toUpperCase()).join("");
            return initials.toUpperCase();
        }, [name]);

        const computedStyle = useMemo(() => {
            if (!src) return {};
            return {
                ...rest.style,
                backgroundImage: `url(${src})`,
            };
        }, [rest.style, src]);

        return (
            <div
                data-element='v-avatar'
                data-size={size}
                ref={ref}
                className={styles.container}
                data-grouped={grouped}
                {...rest}
                style={computedStyle}
            >
                {!src ? computedName || <UserIcon /> : ""}
            </div>
        );
    },
);
Avatar.displayName = "Avatar";
