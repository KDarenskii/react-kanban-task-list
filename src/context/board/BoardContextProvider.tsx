import { nanoid } from "nanoid";
import React from "react";
import { IBoard } from "../../models/types/Board";
import { IList } from "../../models/types/List";
import { Subtask } from "../../models/types/Subtask";
import { ITask } from "../../models/types/Task";
import { BoardContext } from "./boardContext";

type Props = {
    children: React.ReactNode;
};

const BoardContextProvider: React.FC<Props> = ({ children }) => {
    const [boards, setBoards] = React.useState<IBoard[]>([
        {
            id: "fosmdfklms",
            lists: [
                {
                    id: "fmdsklfmsd",
                    title: "TODO",
                    tasks: [
                        {
                            id: "task-1",
                            description: "Very nice task",
                            status: "TODO",
                            subtasks: [
                                {
                                    id: "slngjsngd",
                                    isCompleted: false,
                                    title: "Research competitor pricing and business models",
                                },
                                {
                                    id: "fkdopskfo",
                                    isCompleted: true,
                                    title: "Outline a business model that works for every situation",
                                },
                            ],
                            title: "First task",
                        },
                    ],
                },
                {
                    id: "pmskgm324",
                    tasks: [
                        {
                            id: "task-2",
                            description: "Second task",
                            status: "DOING",
                            subtasks: [
                                {
                                    id: "zdsaafklm",
                                    isCompleted: true,
                                    title: "Tals to potential customers about our proposed solution and ask for fair price expectancy",
                                },
                            ],
                            title: "Second task",
                        },
                    ],
                    title: "DOING",
                },
                {
                    id: "gdnfgjndsj11",
                    tasks: [
                        {
                            id: "task-3",
                            description: "Third task",
                            status: "DONE",
                            subtasks: [
                                {
                                    id: "sngjfdngj12",
                                    isCompleted: true,
                                    title: "Tals to potential customers about our proposed solution and ask for fair price expectancy",
                                },
                            ],
                            title: "Third task",
                        },
                    ],
                    title: "DONE",
                },
            ],
            title: "Platform Launch",
        },
        {
            id: "yymlksmlkdfl",
            lists: [
                {
                    id: "qwemlkmsfd",
                    title: "TODO",
                    tasks: [
                        {
                            id: "womsaklfms",
                            description: "Very nice task",
                            status: "TODO",
                            subtasks: [
                                { id: "iunfijsdnjk", isCompleted: false, title: "Find some inspiration" },
                                { id: "popsdkgmd", isCompleted: false, title: "Create color scheme" },
                            ],
                            title: "Build UI for new project",
                        },
                        {
                            id: "mflksdmksm",
                            description: "Second task",
                            status: "TODO",
                            subtasks: [{ id: "bkfmdlkfmsld", isCompleted: false, title: "Find something to do" }],
                            title: "Build UI for new project",
                        },
                    ],
                },
            ],
            title: "Roadmap",
        },
    ]);

    const addColumn = (boardId: string, name: string) => {
        const newColumn: IList = {
            id: String(Math.random()),
            tasks: [],
            title: name,
        };
        const newBoards: IBoard[] = boards.map((board) => {
            if (board.id === boardId) {
                board.lists.push(newColumn);
            }
            return board;
        });
        setBoards([...newBoards]);
    };

    const addBoard = (name: string) => {
        const newBoard: IBoard = {
            id: String(Math.random()),
            lists: [],
            title: name,
        };
        const newBoards = [...boards, newBoard];
        setBoards(newBoards);
        setActiveBoard(newBoard);
    };

    const renameList = (listId: string, name: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            const changedLists: IList[] = board.lists.map((list) => {
                if (list.id === listId) {
                    list.title = name;
                }
                return list;
            });
            board.lists = [...changedLists];
            return board;
        });
        setBoards([...newBoards]);
    };

    const renameBoard = (boardId: string, name: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            if (board.id === boardId) {
                board.title = name;
            }
            return board;
        });
        setBoards([...newBoards]);
    };

    const deleteBoard = (boardId: string) => {
        const filteredBoards = boards.filter((board) => board.id !== boardId);
        setBoards([...filteredBoards]);
        setActiveBoard(filteredBoards[0] ?? null);
    };

    const deleteList = (listId: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            const filteredLists: IList[] = board.lists.filter((list) => list.id !== listId);
            board.lists = [...filteredLists];
            return board;
        });
        setBoards([...newBoards]);
    };

    const deleteTask = (taskId: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            board.lists.forEach((list) => {
                const filteredTasks = list.tasks.filter((task) => task.id !== taskId);
                list.tasks = [...filteredTasks];
            });
            return board;
        });
        setBoards([...newBoards]);
    };

    const toggleSubtaskStatus = (subtaskId: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            board.lists.forEach((list) =>
                list.tasks.forEach((task) =>
                    task.subtasks.forEach((subtask) => {
                        if (subtask.id === subtaskId) {
                            subtask.isCompleted = !subtask.isCompleted;
                        }
                    })
                )
            );
            return board;
        });
        setBoards(newBoards);
    };

    const addTask = (task: ITask) => {
        const newBoards: IBoard[] = boards.map((board) => {
            if (board.id === activeBoard?.id) {
                board.lists.forEach((list) => {
                    if (list.title === task.status) {
                        list.tasks.unshift(task);
                    }
                });
            }
            return board;
        });
        setBoards([...newBoards]);
    };

    const changeTask = (taskId: string, values: Omit<ITask, "id">) => {
        const newBoards: IBoard[] = boards.map((board) => {
            board.lists.forEach((list) => {
                list.tasks.forEach((task, index) => {
                    if (task.id === taskId) {
                        const changedTask: ITask = { ...task, ...values };
                        list.tasks[index] = changedTask;
                        if (task.status !== changedTask.status) {
                            moveTask(changedTask, board.id);
                        }
                    }
                });
            });
            return board;
        });
        setBoards([...newBoards]);
    };

    const moveTask = (task: ITask, boardId: string) => {
        const newBoards: IBoard[] = boards.map((board) => {
            if (board.id === boardId) {
                board.lists.forEach((list) => {
                    const taskIndex = getTaskIndex(task.id, list.tasks);
                    if (taskIndex !== null) list.tasks.splice(taskIndex, 1);
                    if (list.title === task.status) list.tasks.unshift(task);
                });
            }
            return board;
        });
        setBoards([...newBoards]);
    };

    const getTaskIndex = (taskId: string, tasksList: ITask[]): number | null => {
        for (let i = 0; i < tasksList.length; i++) {
            const index = tasksList.findIndex((task) => task.id === taskId);
            if (index !== -1) return index;
        }
        return null;
    };

    const generateSubtask = (titles: { title: string }[]): Subtask[] => {
        const newSubtasks: Subtask[] = [];
        titles.forEach(({ title }) => {
            if (title) {
                newSubtasks.push({ id: nanoid(), isCompleted: false, title });
            }
        });
        return newSubtasks;
    };

    const getStatuses = (): string[] => {
        return activeBoard ? activeBoard.lists.map((list) => list.title) : [];
    };

    const [activeBoard, setActiveBoard] = React.useState<IBoard | null>(boards[0] ?? null);

    return (
        <BoardContext.Provider
            value={{
                boards,
                setBoards,
                activeBoard,
                setActiveBoard,
                addColumn,
                addBoard,
                renameList,
                deleteList,
                renameBoard,
                deleteBoard,
                toggleSubtaskStatus,
                deleteTask,
                addTask,
                changeTask,
                generateSubtask,
                getStatuses,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContextProvider;
