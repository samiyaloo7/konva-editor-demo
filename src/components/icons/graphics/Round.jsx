import React from "react";

const Round = (props) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="50%"
        cy="50%"
        r="50%"
        fill="#000000"
        stroke="#000000"
        stroke-width="0"
      ></circle>
    </svg>
  );
};

export default Round;
