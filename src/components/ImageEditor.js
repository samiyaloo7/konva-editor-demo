import React from "react";

const ImageEditor = ({
  selectedImageIndex,
  handleDuplicateImage,
  handleDeleteImage,
  handleRotateImage,
  onToggleLock,
  image,
  bringToFront,
  sendToBack,
}) => {
  return (
    <div className="fixed border-b left-[120px] w-[calc(100vw_-_120px)] top-[80px] z-50 bg-[#fff] shadow-lg">
      <div className="text-editor flex container mx-auto divide-x  justify-center">
        <button
          className="px-5 text-lg  flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleDeleteImage(selectedImageIndex)}
        >
          Delete
        </button>
        <br />
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleDuplicateImage(selectedImageIndex)}
        >
          Duplicate
        </button>
        <button
          className="px-9 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => handleRotateImage(selectedImageIndex)}
        >
          Rotate
        </button>
        <br />
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={() => onToggleLock(selectedImageIndex)}
        >
          {image.locked ? "Unlock" : "Lock"}
        </button>
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={sendToBack}
        >
          Send to Back
        </button>
        <button
          className="px-5 text-lg flex gap-2 hover:bg-[#f8f8f8] h-[40px] items-center justify-center"
          onClick={bringToFront}
        >
          Bring to Front
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
