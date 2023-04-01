import React from "react";

const Logo: React.FC = () => {
    return (
        <div className="flex gap-2 items-center justify-center">
            <div className="flex gap-[1px] mt-1">
                <span className="h-5 w-1 bg-blue rounded"></span>
                <span className="h-5 w-1 bg-blue rounded opacity-70"></span>
                <span className="h-5 w-1 bg-blue rounded opacity-50"></span>
            </div>
            <h2 className="text-3xl text-black dark:text-white text-center font-bold">kanban</h2>
        </div>
    );
};

export default Logo;
