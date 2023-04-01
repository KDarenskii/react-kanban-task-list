import React from "react";
import BoardContextProvider from "../context/board/BoardContextProvider";
import Board from "./Board";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";

const App: React.FC = () => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <BoardContextProvider>
            <div className="flex h-full">
                <Sidebar isActive={isActive} setIsActive={setIsActive} />
                <div className="flex-1 overflow-hidden w-full">
                    <Header setIsActive={setIsActive} />
                    <main className="bg-lightblue dark:bg-black h-full p-6 pb-24 overflow-auto">
                        <Board />
                    </main>
                </div>
            </div>
        </BoardContextProvider>
    );
};

export default App;
