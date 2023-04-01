import React from "react";
import { TbAlignBoxLeftMiddle } from "react-icons/tb";
import { useBoardContext } from "../../context/board/boardContext";
import { IBoard } from "../../models/types/Board";
import { IList } from "../../models/types/List";
import { ITask } from "../../models/types/Task";
import ListHeader from "./ListHeader";
import NewColumn from "./NewColumn";
import Task from "./Task";

const Board: React.FC = () => {
    const { boards, setBoards, activeBoard } = useBoardContext();

    const [currentList, setCurrentList] = React.useState<IList>({} as IList);
    const [currentTask, setCurrentTask] = React.useState<ITask>({} as ITask);

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const taskElement = target.closest("[data-task]") as HTMLElement;
        if (taskElement && taskElement.dataset.task !== currentTask.id) {
            if (event.nativeEvent.offsetY < taskElement.offsetHeight / 2) {
                taskElement.classList.remove("shadow-secondaryBottom");
                taskElement.classList.add("shadow-secondaryTop");
            } else {
                taskElement.classList.remove("shadow-secondaryTop");
                taskElement.classList.add("shadow-secondaryBottom");
            }
        }
    };

    const handleDragLeave = (event: React.DragEvent) => {
        const target = event.target as HTMLElement;
        const taskElement = target.closest("[data-task]");
        if (taskElement) taskElement.classList.remove("shadow-secondaryTop", "shadow-secondaryBottom");
    };

    const handleDragStart = (event: React.DragEvent<HTMLElement>, list: IList, task: ITask) => {
        const target = event.target as HTMLElement;
        target.classList.remove("cursor-grab");
        target.classList.add("rotate-[2deg]", "opacity-50", "cursor-grabbing");
        setCurrentList(list);
        setCurrentTask(task);
    };

    const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const taskElement = target.closest("[data-task]") as HTMLElement;
        if (taskElement) {
            if (taskElement) {
                taskElement.classList.remove(
                    "shadow-secondaryTop",
                    "shadow-secondaryBottom",
                    "rotate-[2deg]",
                    "opacity-50"
                );
            }
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLElement>, list: IList, task: ITask) => {
        event.preventDefault();

        const target = event.target as HTMLElement;
        const taskElement = target.closest("[data-task]") as HTMLElement;

        if (task.id === currentTask.id || !taskElement) return;

        taskElement.classList.remove("shadow-secondaryTop", "shadow-secondaryBottom", "opacity-50", "cursor-grabbing");

        const taskIndex = currentList.tasks.indexOf(currentTask);
        currentList.tasks.splice(taskIndex, 1);
        const dropTaskIndex = list.tasks.indexOf(task);

        if (event.nativeEvent.offsetY < taskElement.offsetHeight / 2) {
            list.tasks.splice(dropTaskIndex, 0, currentTask);
        } else {
            list.tasks.splice(dropTaskIndex + 1, 0, currentTask);
        }

        const changedBoards: IBoard[] = boards.map((board) => {
            if (activeBoard?.id === board.id) {
                board.lists.forEach((currList) => {
                    if (currList.id === list.id) {
                        currList = list;
                    }
                    if (currList.id === currentList.id) {
                        currList = currentList;
                    }
                });
            }
            return board;
        });
        setBoards(changedBoards);
    };

    const handleListDrop = (event: React.DragEvent<HTMLUListElement>, list: IList) => {
        event.preventDefault();

        if (list.tasks.length > 0) return;

        event.currentTarget.classList.remove("border-blue");
        event.currentTarget.classList.add("border-transparent");

        list.tasks.push(currentTask);
        const taskIndex = currentList.tasks.indexOf(currentTask);
        currentList.tasks.splice(taskIndex, 1);

        const changedBoards: IBoard[] = boards.map((board) => {
            if (activeBoard?.id === board.id) {
                board.lists.forEach((currList) => {
                    if (currList.id === list.id) {
                        currList = list;
                    }
                    if (currList.id === currentList.id) {
                        currList = currentList;
                    }
                });
            }
            return board;
        });
        setBoards(changedBoards);
    };

    const handleListDragOver = (event: React.DragEvent<HTMLUListElement>, length: number) => {
        event.preventDefault();

        const target = event.target as HTMLElement;
        const listElement = target.closest("[data-list]");

        if (length < 1 && listElement && event.currentTarget.dataset.list !== currentList.id) {
            listElement.classList.remove("border-transparent");
            listElement.classList.add("border-blue");
        }
    };

    const handleListDragLeave = (event: React.DragEvent) => {
        const target = event.target as HTMLElement;
        const listElement = target.closest("[data-list]");
        if (listElement) {
            listElement.classList.remove("border-blue");
            listElement.classList.add("border-transparent");
        }
    };

    return (
        <div className="flex gap-4 overflow-auto pb-4 h-full">
            {activeBoard && (
                <>
                    {activeBoard.lists.map(({ title, tasks, id }) => (
                        <div key={id} className="flex flex-col w-80 shrink-0 xs:w-[16rem]">
                            <ListHeader title={title} length={tasks.length} id={id} />
                            <ul
                                data-list={id}
                                className="flex flex-col gap-3 h-full border-1 border-dashed border-transparent"
                                onDragOver={(event) => handleListDragOver(event, tasks.length)}
                                onDrop={(event) => handleListDrop(event, { title, tasks, id })}
                                onDragLeave={handleListDragLeave}
                            >
                                {tasks.length > 0 &&
                                    tasks.map((task) => (
                                        <Task
                                            key={task.id}
                                            task={task}
                                            list={{ title, tasks, id }}
                                            onDragEnd={handleDragEnd}
                                            onDragLeave={handleDragLeave}
                                            onDragOver={handleDragOver}
                                            onDragStart={handleDragStart}
                                            onDrop={handleDrop}
                                        />
                                    ))}
                                {tasks.length < 1 && (
                                    <div className="flex flex-col flex-1 items-center justify-center pointer-events-none">
                                        <TbAlignBoxLeftMiddle className="h-12 w-12 dark:fill-grey" />
                                        <p className="text-grey text-xl">There are no tasks yet.</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    ))}
                    <NewColumn className="xs:w-[16rem]" boardId={activeBoard.id} />
                </>
            )}
        </div>
    );
};

export default Board;
