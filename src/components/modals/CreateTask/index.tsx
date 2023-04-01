import { nanoid } from "nanoid";
import React from "react";
import { useBoardContext } from "../../../context/board/boardContext";
import useClickOutside from "../../../hooks/useClickOutside";
import useEscape from "../../../hooks/useEscape";
import { ITask } from "../../../models/types/Task";
import Modal from "../Modal";
import TaskForm, { TaskFormValues } from "./TaskForm";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTask: React.FC<Props> = ({ setIsActive }) => {
    const modalRef = React.useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => setIsActive(false));
    useEscape(() => setIsActive(false));

    const { generateSubtask, addTask, getStatuses } = useBoardContext();

    const handleSubmit = (data: TaskFormValues) => {
        console.log(data);
        const { description, status, subtasks, title } = data;
        const newSubtasks = generateSubtask(subtasks);
        const newTask: ITask = { subtasks: newSubtasks, description, status, title, id: nanoid() };
        console.log(newTask);
        addTask(newTask);
    };

    return (
        <Modal ref={modalRef}>
            <h4 className="text-white text-base font-medium mb-4">Add New Task</h4>
            <TaskForm onSubmit={handleSubmit} statuses={getStatuses()} />
        </Modal>
    );
};

export default CreateTask;
