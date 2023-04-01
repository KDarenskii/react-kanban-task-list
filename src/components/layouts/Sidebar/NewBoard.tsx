import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useBoardContext } from "../../../context/board/boardContext";
import useClickOutside from "../../../hooks/useClickOutside";
import useFocus from "../../../hooks/useFocus";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";

const NewBoard: React.FC = () => {
    const [isActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    const { addBoard } = useBoardContext();

    useFocus(inputRef, isActive);
    useClickOutside(formRef, () => setIsActive(false));

    const handleCreateBoardClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addBoard(name);
        setName("");
        setIsActive(false);
    };

    return (
        <>
            {isActive ? (
                <form onSubmit={handleSubmit} ref={formRef} className="px-5">
                    <Label text="Name">
                        <Input
                            ref={inputRef}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Board name"
                        />
                    </Label>
                </form>
            ) : (
                <button
                    onClick={handleCreateBoardClick}
                    className="flex gap-2 items-center pl-5 py-2 text-blue text-base"
                >
                    <HiOutlineClipboardList /> + Create New Board
                </button>
            )}
        </>
    );
};

export default NewBoard;
