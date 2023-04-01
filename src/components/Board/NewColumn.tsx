import React from "react";
import cn from "classnames";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import useClickOutside from "../../hooks/useClickOutside";
import { useBoardContext } from "../../context/board/boardContext";
import useFocus from "../../hooks/useFocus";

type Props = {
    boardId: string;
    className?: string;
};

const NewColunm: React.FC<Props> = ({ boardId, className }) => {
    const [isActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState<string>("");

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const columnRef = React.useRef<HTMLDivElement | null>(null);

    const { addColumn } = useBoardContext();

    const handleColumnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addColumn(boardId, name);
        setName("");
        setIsActive(false);
    };

    useFocus(inputRef, isActive);
    useClickOutside(columnRef, () => setIsActive(false));

    return (
        <div
            className={cn(
                "flex shrink-0 items-center justify-center w-80 text-2xl text-grey bg-lightgrey dark:bg-grey dark:bg-opacity-10 font-medium transition-colors duration-300 cursor-pointer border-solid border-[1px] rounded-lg hover:text-black dark:hover:text-white hover:border-grey",
                { "border-grey": isActive },
                { "border-transparent": !isActive },
                className
            )}
            onClick={handleColumnClick}
            ref={columnRef}
        >
            {isActive ? (
                <form onSubmit={(event) => handleSubmit(event)}>
                    <Label text="Name">
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            ref={inputRef}
                            placeholder="Column name"
                        />
                    </Label>
                </form>
            ) : (
                <p>+ New Column</p>
            )}
        </div>
    );
};

export default NewColunm;
