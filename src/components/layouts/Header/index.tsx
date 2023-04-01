import React from "react";
import HeaderTitle from "./HeaderTitle";
import NewTask from "./NewTask";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ setIsActive }) => {
    return (
        <header className="flex items-center justify-between gap-4 bg-white dark:bg-darkgrey p-5 w-full">
            <HeaderTitle setIsActive={setIsActive} />
            <NewTask />
        </header>
    );
};

export default Header;
