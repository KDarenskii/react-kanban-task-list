import React from "react";

type Props = {
    children: React.ReactNode;
};

const Modal = React.forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-30 flex items-center justify-center px-5">
            <div
                ref={ref}
                className="p-6 rounded-lg bg-white dark:bg-darkgrey max-w-xl max-h-[80%] overflow-y-auto overflow-x-hidden w-full"
            >
                {children}
            </div>
        </div>
    );
});

export default Modal;
