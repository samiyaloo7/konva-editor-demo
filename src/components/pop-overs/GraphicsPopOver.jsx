import React from "react";
// import { Rect } from "react-konva";
import Rect from "../icons/graphics/Rect";
import Round from "../icons/graphics/Round";
import Triangle from "../icons/graphics/Triangle";
import Hexagon from "../icons/graphics/Hexagon";
import DiagonalLine from "../icons/graphics/DiagonalLine";
import Arrow from "../icons/graphics/Arrow";
import TwoWayArray from "../icons/graphics/TwoWayArray";
import Star from "../icons/graphics/Star";

const GraphicsPopOver = ({ handleClick }) => {
  // return <ShapeWidget />;
  // };
  return (
    <div className="bg-white border-black border-2 p-4 rounded-lg shadow-2xl ml-5">
      <div className="grid grid-cols-4">
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("rect")}
        >
          <Rect className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("round")}
        >
          <Round className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("triangle")}
        >
          <Triangle className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("polygon")}
        >
          <Hexagon className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("line")}
        >
          <DiagonalLine className="w-5 h-5 fill-black stroke-black" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("arrow")}
        >
          <Arrow className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("two-sided-arrow")}
        >
          <TwoWayArray className="w-5 h-5" />
        </div>
        <div
          className="p-3 rounded-sm border-black/30 hover:border-black border-1 cursor-pointer"
          onClick={() => handleClick("star")}
        >
          <Star className="w-5 h-5" />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default GraphicsPopOver;
