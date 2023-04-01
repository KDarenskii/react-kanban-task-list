import React from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import Label from "../../formElements/Label";
import Switch from "../../formElements/Switch";

const ThemeMode: React.FC = () => {
    const [isChecked, setIsChecked] = React.useState(true);

    React.useEffect(() => {
        if (
            localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            setIsChecked(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsChecked(false);
        }
    }, []);

    const handleChangeMode = () => {
        document.querySelector("html")?.classList.toggle("dark");
        if (document.querySelector("html")?.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        setIsChecked((prev) => !prev);
    };

    return (
        <div className="text-grey bg-lightgrey dark:bg-black rounded-lg px-4 py-2 flex items-center justify-center gap-5">
            <MdOutlineLightMode className="" />
            <Label>
                <Switch checked={isChecked} onChange={handleChangeMode} />
            </Label>
            <BsMoonStarsFill />
        </div>
    );
};

export default ThemeMode;
