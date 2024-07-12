import React from "react";

const ShapeEditor = ({
  selectedShapeIndex,
  // handleDuplicateImage,
  handleShapeDuplicate,
  handleDeleteShape,
  handleChangeColor,
  // handleRotateImage,
  onToggleLock,
  shape,
  // bringToFront,
  // sendToBack,
  sendShapeToBack,
  bringShapeToFront,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleChangeColor(selectedShapeIndex, name, value);
  };
  return (
    <div className="fixed border-b left-[120px] w-[calc(100vw_-_120px)] top-[80px] z-50 bg-[#fff] shadow-lg">
      <div className="text-editor flex container mx-auto divide-x  justify-center">
        <button
          className="px-5 text-lg  flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleDeleteShape(selectedShapeIndex)}
        >
          Delete
        </button>
        <br />
        <div className="flex gap-3 items-center px-2">
          <input
            type="color"
            name="fill"
            value={shape.fill}
            onChange={handleChange}
            className="w-[20px] h-[20px] object-contain mx-1"
          />
        </div>
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleShapeDuplicate(selectedShapeIndex)}
        >
          Duplicate
        </button>
        <br />
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => onToggleLock(selectedShapeIndex)}
        >
          {shape.locked ? "Unlock" : "Lock"}
        </button>
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => sendShapeToBack(selectedShapeIndex)}
        >
          Send to Back
        </button>
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => bringShapeToFront(selectedShapeIndex)}
        >
          Bring to Front
        </button>
      </div>
    </div>
  );
};

export default ShapeEditor;
