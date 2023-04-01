import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import useClickOutside from "../hooks/useClickOutside";

type Props = {
    handleDelete: () => void;
    openEditing: (event: React.MouseEvent) => void;
};

const Options: React.FC<Props> = ({ openEditing, handleDelete }) => {
    const [isActive, setIsActive] = React.useState(false);

    const optionsRef = React.useRef<HTMLUListElement | null>(null);

    useClickOutside(optionsRef, () => setIsActive(false));

    const handleOpenOptions = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive(true);
    };

    const handleEditClick = (event: React.MouseEvent) => {
        setIsActive(false);
        openEditing(event);
    };

    const onDeleteClick = () => {
        setIsActive(false);
        handleDelete();
    };

    return (
        <div className="relative">
            <HiDotsVertical
                onClick={handleOpenOptions}
                className="fill-grey w-5 h-5 cursor-pointer transition-colors hover:fill-black dark:hover:fill-white"
            />
            {isActive && (
                <ul
                    ref={optionsRef}
                    className="absolute -bottom-19 left-0 rounded-lg overflow-hidden border-solid border-1 border-darkgrey"
                >
                    <li
                        onClick={onDeleteClick}
                        className="flex px-2 py-1 bg-white dark:bg-grey cursor-pointer transition-colors items-center gap-1 text-sm hover:text-red-500 hover:bg-lightblue dark:hover:bg-opacity-80"
                    >
                        <BsFillTrash3Fill />
                        <span>Delete</span>
                    </li>
                    <li
                        onClick={(event) => handleEditClick(event)}
                        className="flex px-2 py-1 bg-white dark:bg-grey cursor-pointer transition-colors items-center gap-1 text-sm dark:hover:text-white hover:bg-lightblue hover:text-blue dark:hover:bg-opacity-80"
                    >
                        <CiEdit />
                        <span>Edit</span>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Options;
