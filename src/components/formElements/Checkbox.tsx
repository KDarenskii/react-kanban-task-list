import React from "react";
import cn from "classnames";
import { BsCheckLg } from "react-icons/bs";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<Props> = ({ checked, ...rest }) => {
    return (
        <>
            <input {...rest} checked={checked} className="hidden-away" type="checkbox" />
            <span
                className={cn(
                    "w-5 h-5 border-solid border-1 border-blue dark:border-white relative shrink-0",
                    checked ? "bg-blue" : "bg-lightblue dark:bg-grey"
                )}
            >
                {checked && (
                    <BsCheckLg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 fill-white" />
                )}
            </span>
        </>
    );
};

export default Checkbox;
