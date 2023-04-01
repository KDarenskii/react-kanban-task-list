import React from "react";
import cn from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "light";
}

const buttonColorClass = "bg-blue text-white";
const lightButtonColorClass = "bg-black dark:bg-white text-blue focus:border-blue";

const Button: React.FC<Props> = ({ className, children, color, disabled, ...rest }) => {
    return (
        <button
            {...rest}
            disabled={disabled}
            className={cn(
                "px-4 py-2 text-center rounded-full transition-colors border-2 border-transparent border-solid hover:bg-opacity-90 dark:hover:bg-opacity-80",
                color ? lightButtonColorClass : buttonColorClass,
                { "opacity-50 hover:bg-opacity-100": disabled },
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
