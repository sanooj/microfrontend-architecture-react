import React from "react";

const Button = ({ clickHandler }) => {
  return (
    <div>
      <button type='button' onClick={clickHandler}>
        Counter
      </button>
    </div>
  );
};

export default Button;
