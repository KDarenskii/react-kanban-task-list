import React from "react";
import { useBoardContext } from "../../context/board/boardContext";
import useClickOutside from "../../hooks/useClickOutside";
import useEscape from "../../hooks/useEscape";
import { ITask } from "../../models/types/Task";
import Checkbox from "../formElements/Checkbox";
import Options from "../Options";
import TaskForm, { TaskFormValues } from "./CreateTask/TaskForm";
import Modal from "./Modal";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask;
};

const FullTask: React.FC<Props> = ({ setIsActive, task }) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const modalRef = React.useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => setIsActive(false));
    useEscape(() => setIsActive(false));

    const { toggleSubtaskStatus, deleteTask, getStatuses, generateSubtask, changeTask } = useBoardContext();

    const { subtasks } = task;

    const completedSubtasksCount = subtasks.reduce(
        (counter, subtask) => (subtask.isCompleted ? counter + 1 : counter),
        0
    );

    const handleOpenEditing = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsEditing(true);
    };

    const handleSubmit = (data: TaskFormValues) => {
        const { description, status, subtasks, title } = data;
        const newSubtasks = generateSubtask(subtasks);
        const newTask: Omit<ITask, "id"> = { subtasks: newSubtasks, description, status, title };
        changeTask(task.id, newTask);
    };

    return (
        <Modal ref={modalRef}>
            <article className="p-6 rounded-lg max-w-xl w-full">
                {!isEditing && (
                    <>
                        <header className="mb-5">
                            <div className="mb-5 flex items-center justify-between gap-2">
                                <h3 className="text-xl font-medium text-black dark:text-white">{task.title}</h3>
                                <Options handleDelete={() => deleteTask(task.id)} openEditing={handleOpenEditing} />
                            </div>
                            <p className="text-grey text-base">{task.description}</p>
                        </header>
                        <h5 className="text-sm text-black dark:text-white mb-2">
                            Subtasks ({completedSubtasksCount} of {subtasks.length})
                        </h5>
                        <ul className="mb-5">
                            {subtasks.map((subtask) => (
                                <li className="bg-lightgrey dark:bg-black flex items-center mb-2 rounded-lg" key={subtask.id}>
                                    <label className="flex items-center gap-3 cursor-pointer flex-1 p-4 xs:p-3">
                                        <Checkbox
                                            checked={subtask.isCompleted}
                                            onChange={() => toggleSubtaskStatus(subtask.id)}
                                        />
                                        <p
                                            className={`${
                                                subtask.isCompleted ? "text-grey line-through" : "text-black dark:text-white"
                                            } xs:text-sm`}
                                        >
                                            {subtask.title}
                                        </p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <h5 className="text-sm text-black dark:text-white mb-2">Status</h5>
                        <p className="text-grey font-medium text-lg">{task.status}</p>
                    </>
                )}
                {isEditing && (
                    <TaskForm onSubmit={handleSubmit} statuses={getStatuses()} task={task} isEditingTask={true} />
                )}
            </article>
        </Modal>
    );
};

export default FullTask;
