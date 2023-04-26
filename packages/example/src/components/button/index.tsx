import React from "react";

export const Button = ({ children }) => {
    return (
        <button onClick={() => console.log("hello")} type='button'>
            {children}
        </button>
    );
};
