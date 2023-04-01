import React from "react";
import cn from "classnames";
import BoardList from "./BoardList";
import Logo from "./Logo";
import { CgClose } from "react-icons/cg";
import ThemeMode from "./ThemeMode";

type Props = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<Props> = ({ isActive, setIsActive }) => {
    return (
        <aside
            className={cn(
                "w-[260px] h-full bg-white dark:bg-darkgrey border-solid border-opacity-10 border-grey border-r-[1px] shrink-0 overflow-hidden pb-6 transition-transform duration-300 z-20 md:fixed md:left-0 md:top-0",
                { "md:-translate-x-[260px]": !isActive },
                { "left-0": isActive }
            )}
        >
            <div className="h-full flex flex-col overflow-y-auto">
                <header className="mb-6 pt-5 px-4 flex justify-center items-center md:justify-between">
                    <Logo />
                    <CgClose
                        className="text-black dark:text-white text-3xl cursor-pointer hidden md:block"
                        onClick={() => setIsActive(false)}
                    />
                </header>
                <BoardList setIsActive={setIsActive} />
                <footer className="px-5 mt-auto">
                    <ThemeMode />
                </footer>
            </div>
        </aside>
    );
};

export default Sidebar;
