import React from "react";
import { CiText } from "react-icons/ci";
import ColorPiker from "./images/colorPiker.svg";
import { BoldText, Italic, Strikethrough, Underline } from "./images/Icon";

function TextEditor({
  text,
  onChange,
  onToggle,
  onDelete,
  onDuplicate,
  onToggleLock,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleToggle = (property) => {
    onToggle(property);
  };

  const handleFontSizeChange = (increment) => {
    const newFontSize = Math.max(1, text.fontSize + increment);
    onChange("fontSize", newFontSize);
  };

  return (
    <div className="fixed top-[80px] left-[120px] w-[calc(100vw_-_120px)] border-b z-50 bg-[#fff] shadow-lg">
      <div className="text-editor flex container mx-auto divide-x  justify-center">
        <div className="min-w-[206px] flex items-center  rounded-full px-3 pr-5">
          <CiText className="text-[26px] mr-2" />
          <select
            name="fontFamily"
            className="Text-fild focus:outline-none w-full"
            value={text.fontFamily}
            onChange={handleChange}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        {/* <div className="min-w-[206px] flex items-center px-3">
          <CiText className="text-[26px] mr-2" />
          <input
            type="text"
            name="text"
            value={text.text}
            className="Text-fild focus:outline-none border-b"
            onChange={handleChange}
          />
        </div> */}
        <div className="min-w-[50px] flex items-center px-5">
          <button
            className="hover:bg-[#f8f8f8] w-[32px] h-[40px] text-xl font-bold"
            onClick={() => handleFontSizeChange(1)}
          >
            +
          </button>
          <input
            type="number"
            name="fontSize"
            className="Text-fild focus:outline-none border-b max-w-[50px] text-center text-xl"
            value={text.fontSize}
            onChange={handleChange}
          />
          <button
            className="hover:bg-[#f8f8f8] w-[32px] h-[40px] text-xl font-bold"
            onClick={() => handleFontSizeChange(-1)}
          >
            -
          </button>
        </div>

        <div className="flex gap-5 items-center px-5">
          <img
            src={ColorPiker}
            alt=""
            className="w-[32px] h-[32px] object-contain mx-2"
          />
          {/* <input
            type="color"
            name="fill"
            value={text.fill}
            onChange={handleChange}
          /> */}

          <div className="flex items-center">
            <div className="relative h-[32px] w-[32px]">
              <input
                type="checkbox"
                name="bold"
                className="h-[32px] w-[32px] absolute top-0 left-0 z-50 opacity-0"
                checked={text.fontStyle && text.fontStyle.includes("bold")}
                onChange={() => handleToggle("bold")}
              />

              <div
                className={`${
                  text.fontStyle.includes("bold") &&
                  " rounded-full bg-black text-white p-[3px] pb-[5px]"
                } w-[32px] h-[32px] object-contain mx-4 absolute top-0 -left-[17px]`}
              >
                <BoldText />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative h-[32px] w-[32px]">
              <input
                type="checkbox"
                name="italic"
                className="h-[32px] w-[32px] absolute top-0 left-0 z-50 opacity-0"
                checked={text.fontStyle && text.fontStyle.includes("italic")}
                onChange={() => handleToggle("italic")}
              />

              <div
                className={`${
                  text.fontStyle.includes("italic") &&
                  " rounded-full bg-black text-white p-[5px] pb-[5px]"
                } w-[32px] h-[32px] object-contain mx-4 absolute top-0 -left-[17px]`}
              >
                <Italic />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative h-[32px] w-[32px]">
              <input
                type="checkbox"
                name="underline"
                className="h-[32px] w-[32px] absolute top-0 left-0 z-50 opacity-0"
                checked={
                  text.textDecoration &&
                  text.textDecoration.includes("underline")
                }
                onChange={() => handleToggle("underline")}
              />

              <div
                className={`${
                  text.textDecoration.includes("underline") &&
                  " rounded-full bg-black text-white p-[5px] pb-[5px]"
                } w-[32px] h-[32px] object-contain mx-4 absolute top-0 -left-[17px]`}
              >
                <Underline />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative h-[32px] w-[32px]">
              <input
                type="checkbox"
                name="line-through"
                className="h-[32px] w-[32px] absolute top-0 left-0 z-50 opacity-0"
                checked={
                  text.textDecoration &&
                  text.textDecoration.includes("line-through")
                }
                onChange={() => handleToggle("line-through")}
              />

              <div
                className={`${
                  text.textDecoration.includes("line-through") &&
                  " rounded-full bg-black text-white p-[5px] pb-[5px]"
                } w-[32px] h-[32px] object-contain mx-4 absolute top-0 -left-[17px]`}
              >
                <Strikethrough />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="px-6 flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="px-6 flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
            onClick={onDuplicate}
          >
            Duplicate
          </button>
          <button
            className="px-6 flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
            onClick={onToggleLock}
          >
            {text.locked ? "Unlock" : "Lock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
