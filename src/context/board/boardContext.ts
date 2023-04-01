import React from "react";
import { IBoard } from "../../models/types/Board";
import { Subtask } from "../../models/types/Subtask";
import { ITask } from "../../models/types/Task";

type BoardState = {
    boards: IBoard[];
    setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
    activeBoard: IBoard;
    setActiveBoard: React.Dispatch<React.SetStateAction<IBoard>>;
    addColumn: (boardId: string, name: string) => void;
    addBoard: (name: string) => void;
    renameList: (listId: string, name: string) => void;
    deleteList: (listId: string) => void;
    renameBoard: (boardId: string, name: string) => void;
    deleteBoard: (boardId: string) => void;
    toggleSubtaskStatus: (subtaskId: string) => void;
    deleteTask: (taskId: string) => void;
    addTask: (task: ITask) => void;
    generateSubtask: (titles: { title: string }[]) => Subtask[];
    getStatuses: () => string[];
    changeTask: (taskId: string, values: Omit<ITask, "id">) => void;
};

export const BoardContext = React.createContext<BoardState>({} as BoardState);
export const useBoardContext = () => React.useContext(BoardContext);
