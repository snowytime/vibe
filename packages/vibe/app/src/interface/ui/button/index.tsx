import React from "react";

import "./styles.scss";

type Props = React.HTMLProps<HTMLButtonElement> & {
    children: React.ReactNode;
};

export const Button = ({ children, ...rest }: Props) => {
    return (
        <button className='vibe__button' {...rest} type='button'>
            {children}
        </button>
    );
};
