import React from "react";
import { useBoardContext } from "../../context/board/boardContext";
import useFocus from "../../hooks/useFocus";
import ActionButton from "../buttons/ActionButton";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import ListOptions from "../Options";

type Props = {
    title: string;
    length: number;
    id: string;
};

const ListHeader: React.FC<Props> = ({ title, length, id }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState(title);

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const { renameList, deleteList } = useBoardContext();
    useFocus(inputRef, isEditing);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title !== name && name.length) {
            renameList(id, name);
        } else if (!name.length) {
            setName(title);
        }
        setIsEditing(false);
    };

    return (
        <header className="flex items-center justify-between gap-2 mb-3">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1">
                    <Label className="flex-1">
                        <Input
                            ref={inputRef}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Column name"
                            className="px-3 py-2 text-sm"
                        />
                    </Label>
                    <ActionButton type="submit" buttonType="confirm" />
                    <ActionButton type="button" buttonType="decline" onClick={() => setIsEditing(false)} />
                </form>
            ) : (
                <>
                    <h5 className="text-grey text-sm font-medium">
                        {title} ({length})
                    </h5>
                    <ListOptions handleDelete={() => deleteList(id)} openEditing={() => setIsEditing(true)} />
                </>
            )}
        </header>
    );
};

export default ListHeader;
