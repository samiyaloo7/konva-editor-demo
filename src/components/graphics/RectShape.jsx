import React from "react";
import { Rect } from "react-konva";

const RectShape = ({ props }) => (
  <Rect
    x={0}
    y={0}
    width={50}
    height={50}
    fill="#223423"
    draggable
    // shadowBlur={10}
    {...props}
  />
);

export default RectShape;
