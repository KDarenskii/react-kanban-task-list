import { ITask } from "./Task";

export interface IList {
    id: string;
    title: string;
    tasks: ITask[];
}
