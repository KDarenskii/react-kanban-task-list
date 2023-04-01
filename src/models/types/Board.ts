import { IList } from "./List";

export interface IBoard {
    title: string;
    id: string;
    lists: IList[];
}
