import React from "react";
import cn from "classnames";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useBoardContext } from "../../../context/board/boardContext";
import NewBoard from "./NewBoard";

const itemClass = "flex gap-2 font-bold items-center py-2 pl-5 text-grey text-lg cursor-pointer";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardList: React.FC<Props> = ({ setIsActive }) => {
    const [activeItem, setActiveItem] = React.useState(0);

    const handleClick = (num: number) => {
        setActiveItem(num);
        setActiveBoard(boards[num]);
        setIsActive(false);
    };

    const { boards, setActiveBoard } = useBoardContext();

    return (
        <>
            <h5 className="text-grey mb-2 text-xs pl-5">ALL BOARDS ({boards.length})</h5>
            <ul className="pr-6">
                {boards.map((board, index) => (
                    <li
                        key={board.id}
                        onClick={() => handleClick(index)}
                        className={cn(itemClass, { "bg-blue text-white rounded-r-3xl": activeItem === index })}
                    >
                        <HiOutlineClipboardList className="shrink-0" />{" "}
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{board.title}</span>
                    </li>
                ))}
            </ul>
            <NewBoard />
        </>
    );
};

export default BoardList;
