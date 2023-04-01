import React from "react";
import { useBoardContext } from "../../../context/board/boardContext";
import useFocus from "../../../hooks/useFocus";
import ActionButton from "../../buttons/ActionButton";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import Options from "../../Options";
import { AiOutlineMenu } from "react-icons/ai";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderTitle: React.FC<Props> = ({ setIsActive }) => {
    const { activeBoard, renameBoard, deleteBoard } = useBoardContext();

    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState(activeBoard?.title ?? "");

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    useFocus(inputRef, isEditing);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (activeBoard && activeBoard.title !== name && name.length) {
            renameBoard(activeBoard.id, name);
        } else if (activeBoard && !name.length) {
            setName(activeBoard.title);
        }
        setIsEditing(false);
    };

    return (
        <>
            {activeBoard && (
                <>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <Label>
                                <Input
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    ref={inputRef}
                                    placeholder="Board name"
                                    className="px-3 py-2 text-sm"
                                />
                            </Label>
                            <ActionButton type="submit" buttonType="confirm" />
                            <ActionButton type="button" buttonType="decline" onClick={() => setIsEditing(false)} />
                        </form>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <AiOutlineMenu
                                className="text-black dark:text-white text-xl w-6 h-6 cursor-pointer hidden md:block"
                                onClick={() => setIsActive(true)}
                            />
                            <h3 className="text-black dark:text-white text-lg font-medium">{activeBoard.title}</h3>
                            <Options
                                openEditing={() => setIsEditing(true)}
                                handleDelete={() => deleteBoard(activeBoard.id)}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default HeaderTitle;
