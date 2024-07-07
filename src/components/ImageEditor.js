import React from "react";

const ImageEditor = ({
  selectedImageIndex,
  handleDuplicateImage,
  handleDeleteImage,
  onToggleLock,
  image,
}) => {
  return (
    <div className="border-b relative z-50 bg-[#fff] shadow-lg">
      <div className="text-editor flex container mx-auto divide-x  justify-center">
        <button
          className="px-9 text-lg  flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleDeleteImage(selectedImageIndex)}
        >
          Delete Image
        </button>
        <br />
        <button
          className="px-9 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleDuplicateImage(selectedImageIndex)}
        >
          Duplicate Image
        </button>
        <br />
        <button
          className="px-9 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => onToggleLock(selectedImageIndex)}
        >
          {image.locked ? "Unlock" : "Lock"}
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
