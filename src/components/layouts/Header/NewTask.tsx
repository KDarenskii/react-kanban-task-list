import React from "react";
import { useBoardContext } from "../../../context/board/boardContext";
import Button from "../../buttons/Button";
import CreateTask from "../../modals/CreateTask";

const NewTask: React.FC = () => {
    const [isActive, setIsActive] = React.useState(false);

    const handleOpenModal = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive(true);
    };

    const { activeBoard } = useBoardContext();

    return (
        <>
            {activeBoard && (
                <>
                    {isActive && <CreateTask setIsActive={setIsActive} />}
                    <Button
                        className="xs:px-4 xs:py-0"
                        disabled={activeBoard.lists.length < 1}
                        onClick={handleOpenModal}
                    >
                        <span className="xs:text-xl xs:font-bold">+</span>{" "}
                        <span className="xs:hidden">Add New Task</span>
                    </Button>
                </>
            )}
        </>
    );
};

export default NewTask;
