import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, Props>(({ children, ...rest }, ref) => {
    return (
        <select
            {...rest}
            ref={ref}
            className="w-full bg-lightgrey dark:bg-darkgrey border-grey border-solid border-1 rounded-lg p-3 text-black dark:text-white focus:border-blue"
        >
            {children}
        </select>
    );
});

export default Select;
