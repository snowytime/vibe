import React from "react";
import "../shared.scss";

export const Input = ({ value, onChange }) => {
    return <input className='mod bg-black' type='text' value={value} onChange={onChange} />;
};
