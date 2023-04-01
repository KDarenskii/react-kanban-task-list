import React from "react";
import cn from "classnames";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(({ className, ...rest }, ref) => {
    return (
        <textarea
            {...rest}
            ref={ref}
            className={cn(
                "bg-lightgrey dark:bg-darkgrey text-black dark:text-white resize-none h-32 w-full p-3 border-1 border-solid border-grey rounded-lg focus:border-blue",
                className
            )}
        ></textarea>
    );
});

export default Textarea;
