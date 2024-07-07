import React from "react";

export const BoldText = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <text
        x="50%"
        y="50%"
        font-size="26"
        font-family="arial black"
        fill="currentColor"
        text-anchor="middle"
        dominant-baseline="central"
      >
        B
      </text>
    </svg>
  );
};
export const Italic = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <text
        x="50%"
        y="55%"
        font-size="28"
        font-family="roboto, serif"
        font-weight="100"
        font-style="italic"
        fill="currentColor"
        text-anchor="middle"
        dominant-baseline="central"
      >
        I
      </text>
    </svg>
  );
};
export const Underline = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <text
        x="50%"
        y="51%"
        font-size="23"
        font-family="arial"
        font-weight="200"
        fill="currentColor"
        text-anchor="middle"
        dominant-baseline="central"
      >
        U
      </text>
      <path fill="currentColor" d="M 9 29 h 15 V 27 H 8 z" />
    </svg>
  );
};
export const Strikethrough = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <defs>
        <clipPath id="cut-off-center">
          <rect width="32" height="15" />
          <rect y="18" width="32" height="14" />
        </clipPath>
      </defs>
      <text
        x="50%"
        y="54%"
        font-size="26"
        font-family="arial"
        font-weight="400"
        fill="currentColor"
        text-anchor="middle"
        dominant-baseline="central"
        clip-path="url(#cut-off-center)"
      >
        S
      </text>
      <rect fill="currentColor" y="16" x="6" width="20" height="1" />
    </svg>
  );
};
