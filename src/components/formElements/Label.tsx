import React from "react";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    text?: string;
    className?: string;
};

const Label: React.FC<Props> = ({ children, text, className }) => {
    return (
        <label className={cn("block cursor-pointer", className)}>
            {text && <p className="mb-1 text-black dark:text-white text-base">{text}</p>}
            {children}
        </label>
    );
};

export default Label;
