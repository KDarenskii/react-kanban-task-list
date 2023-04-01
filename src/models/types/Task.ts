import { Subtask } from "./Subtask";

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}