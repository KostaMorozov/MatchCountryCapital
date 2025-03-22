import React from "react";
import { ButtonProps } from "../types/type";

const Button: React.FC<ButtonProps> = ({
  label,
  className,
  isChecked,
  isError,
}) => {
  return (
    <button
      id={label}
      className={`${className ? className : "buttonItem"} ${
        isChecked ? "bgBlue" : ""
      } ${isError && isChecked ? "bgRed" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
