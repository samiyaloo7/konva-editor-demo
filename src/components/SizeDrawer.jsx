import React, { useState } from "react";

const SizeDrawer = ({ setBoundary, boundary, setShowChangeSize }) => {
  const [height, setHeight] = useState(boundary?.height ?? 100);
  const [width, setWidth] = useState(boundary?.width ?? 100);
  return (
    <div className="p-5 h-screen bg-white shadow-lg z-[999] fixed top-0 w-[400px] right-0">
      <div className="flex justify-end">
        <button
          className="text-2xl font-bold"
          onClick={() => setShowChangeSize(false)}
        >
          X
        </button>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <label> Width : </label>
        <input
          className="border border-black px-2"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <label> Height : </label>
        <input
          className="border border-black px-2"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button
        className="border mt-10 bg-gray-300 border-black px-5 py-1 rounded-md"
        onClick={() => {
          setShowChangeSize(false);
          setBoundary((prev) => ({ ...prev, height, width }));
        }}
      >
        Change Size
      </button>
    </div>
  );
};

export default SizeDrawer;
