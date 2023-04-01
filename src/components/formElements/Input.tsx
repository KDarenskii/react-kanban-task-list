import React from "react";
import cn from "classnames";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => {
    return (
        <input
            {...rest}
            className={cn(
                "w-full text-black dark:text-white text-base rounded-lg border-solid border-1 border-grey p-3 bg-lightgrey dark:bg-darkgrey focus:border-blue",
                className
            )}
            ref={ref}
        />
    );
});

export default Input;
