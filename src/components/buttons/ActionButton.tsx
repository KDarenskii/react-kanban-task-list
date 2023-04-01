import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: "confirm" | "decline";
}

const ActionButton: React.FC<Props> = ({ buttonType, ...rest }) => {
    return (
        <button {...rest}>
            {buttonType === "confirm" && (
                <BsCheckLg className="w-5 h-5 transition-colors text-green-800 hover:text-green-500" />
            )}
            {buttonType === "decline" && (
                <FaTimes className="w-5 h-5 transition-colors text-red-900 hover:text-red-600" />
            )}
        </button>
    );
};

export default ActionButton;
