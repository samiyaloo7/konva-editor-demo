import React from "react";

const Rect = (props) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="currentColor"
        stroke="currentColor"
        strokewidth="0"
      ></rect>
    </svg>
  );
};

export default Rect;
