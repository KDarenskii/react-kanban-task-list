import React from "react";
import cn from "classnames";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Switch: React.FC<Props> = ({ checked, ...rest }) => {
    return (
        <>
            <input {...rest} checked={checked} className="hidden-away" type="checkbox" />
            <div className={cn("h-[1.3rem] w-9 relative rounded-full cursor-pointer", checked ? "bg-blue" : "bg-grey")}>
                <div
                    className={cn("absolute top-[2px] left-[3px] pb-2 h-4 w-4 rounded-full bg-white transition-all", {
                        "left-full -translate-x-[19px]": checked,
                    })}
                ></div>
            </div>
        </>
    );
};

export default Switch;
