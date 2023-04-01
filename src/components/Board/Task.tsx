import React from "react";
import { IList } from "../../models/types/List";
import { ITask } from "../../models/types/Task";
import FullTask from "../modals/FullTask";

type Props = {
    task: ITask;
    list: IList;
    onDragOver: (event: React.DragEvent<HTMLElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
    onDragStart: (event: React.DragEvent<HTMLElement>, list: IList, task: ITask) => void;
    onDragEnd: (event: React.DragEvent<HTMLElement>) => void;
    onDrop: (event: React.DragEvent<HTMLElement>, list: IList, task: ITask) => void;
};

const Task: React.FC<Props> = ({ task, list, onDragEnd, onDragLeave, onDragOver, onDragStart, onDrop }) => {
    const [isActive, setIsActive] = React.useState(false);

    const completedSubtasksCount = task.subtasks.reduce(
        (counter, task) => (task.isCompleted ? counter + 1 : counter),
        0
    );

    const handleOpenFullTask = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive(true);
    };

    return (
        <>
            {isActive && <FullTask setIsActive={setIsActive} task={task} />}
            <article
                data-task={task.id}
                className="p-6 bg-white dark:bg-darkgrey rounded-sm w-full transition-all cursor-grab xs:p-4"
                onClick={handleOpenFullTask}
                draggable={true}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDragStart={(event) => onDragStart(event, list, task)}
                onDragEnd={onDragEnd}
                onDrop={(event) => onDrop(event, list, task)}
            >
                <h6 className="text-black dark:text-white font-medium text-base mb-2 pointer-events-none">
                    {task.title}
                </h6>
                <p className="text-sm text-grey pointer-events-none">
                    {completedSubtasksCount} of {task.subtasks.length} subtasks
                </p>
            </article>
        </>
    );
};

export default Task;
