import React from "react";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const FieldError: React.FC<Props> = ({ children, className }) => {
    return <p className={cn("text-sm text-red-400 pl-2", className)}>{children}</p>;
};

export default FieldError;
