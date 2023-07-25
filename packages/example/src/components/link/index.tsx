import React from "react";
import "../shared.scss";

export const Link = ({ href }: { href: string }) => {
    return (
        <a className='mod' href={href}>
            Link
        </a>
    );
};
