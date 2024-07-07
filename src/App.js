import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text, Transformer, Image } from "react-konva";
import { TfiText } from "react-icons/tfi";
import "./App.css";
import Header from "./components/Header";
import { AiFillAppstore } from "react-icons/ai";
import { PiImageSquare } from "react-icons/pi";
import { BiLogoGraphql } from "react-icons/bi";
import TextEditor from "./components/TextEditor";
import ImageEditor from "./components/ImageEditor";

import backgroundImg from "./components/images/preview.jpg";

function App() {
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const transformerRef = useRef(null);
  const stageRef = useRef(null);

  const addText = () => {
    setTexts([
      ...texts,
      {
        text: "New Text",
        fontSize: 10,
        fontFamily: "Arial",
        fill: "black",
        align: "left",
        fontStyle: "",
        textDecoration: "",
        locked: false,
      },
    ]);
  };

  const handleTextChange = (index, key, value) => {
    const newTexts = texts.slice();
    newTexts[index] = {
      ...newTexts[index],
      [key]: value,
    };
    setTexts(newTexts);
  };

  const handleToggle = (index, property) => {
    if (property === "underline" || property === "line-through") {
      const newTexts = texts.slice();
      const currentStyles = newTexts[index].textDecoration
        ? newTexts[index].textDecoration.split(" ")
        : [];
      if (currentStyles.includes(property)) {
        newTexts[index].textDecoration = currentStyles
          .filter((style) => style !== property)
          .join(" ");
      } else {
        newTexts[index].textDecoration = [...currentStyles, property].join(" ");
      }
      setTexts(newTexts);
    } else {
      const newTexts = texts.slice();
      const currentStyles = newTexts[index].fontStyle
        ? newTexts[index].fontStyle.split(" ")
        : [];
      if (currentStyles.includes(property)) {
        newTexts[index].fontStyle = currentStyles
          .filter((style) => style !== property)
          .join(" ");
      } else {
        newTexts[index].fontStyle = [...currentStyles, property].join(" ");
      }
      setTexts(newTexts);
    }
  };

  const handleDelete = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
    setSelectedTextIndex(null);
  };

  const handleDuplicate = (index) => {
    const newTexts = texts.slice();
    newTexts.push({
      ...texts[index],
      x: texts[index].x + 10,
      y: texts[index].y + 10,
    });
    setTexts(newTexts);
  };

  const toggleLockText = (index) => {
    const newTexts = texts.slice();
    newTexts[index] = {
      ...newTexts[index],
      locked: !newTexts[index].locked,
    };
    setTexts(newTexts);
  };

  const checkTextBounds = (text, node) => {
    const stage = stageRef.current;
    const stageWidth = stage.width();
    const stageHeight = stage.height();

    let newX = node.x();
    let newY = node.y();

    // Ensure the text is within the horizontal boundaries
    if (newX < 0) {
      newX = 0;
    } else if (newX + node.width() > stageWidth) {
      newX = stageWidth - node.width();
    }

    // Ensure the text is within the vertical boundaries
    if (newY < 0) {
      newY = 0;
    } else if (newY + node.height() > stageHeight) {
      newY = stageHeight - node.height();
    }

    return { x: newX, y: newY };
  };

  useEffect(() => {
    if (selectedTextIndex !== null) {
      const selectedNode = stageRef.current.findOne(
        `#text-${selectedTextIndex}`
      );
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else if (selectedImageIndex !== null) {
      const selectedNode = stageRef.current.findOne(
        `#Image-${selectedImageIndex}`
      );
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedTextIndex, selectedImageIndex]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImages([
          ...images,
          {
            image: img,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            rotation: 0,
            locked: false,
          },
        ]);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateImage = (index, newAttrs) => {
    const updatedImages = [...images];
    updatedImages[index] = {
      ...updatedImages[index],
      ...newAttrs,
    };
    setImages(updatedImages);
  };

  const handleDeleteImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
    setSelectedImageIndex(null);
  };

  const handleDuplicateImage = (index) => {
    const duplicatedImage = {
      ...images[index],
      x: images[index].x + 10,
      y: images[index].y + 10,
    };
    setImages([...images, duplicatedImage]);
  };

  const toggleLockImage = (index) => {
    const newImages = images.slice();
    newImages[index] = {
      ...newImages[index],
      locked: !newImages[index].locked,
    };
    setImages(newImages);
  };

  return (
    <>
      <Header />
      {selectedTextIndex !== null && (
        <TextEditor
          text={texts[selectedTextIndex]}
          onChange={(key, value) =>
            handleTextChange(selectedTextIndex, key, value)
          }
          onToggle={(property) => handleToggle(selectedTextIndex, property)}
          onDelete={() => handleDelete(selectedTextIndex)}
          onDuplicate={() => handleDuplicate(selectedTextIndex)}
          onToggleLock={() => toggleLockText(selectedTextIndex)}
        />
      )}
      {selectedImageIndex !== null && (
        <ImageEditor
          selectedImageIndex={selectedImageIndex}
          handleDeleteImage={handleDeleteImage}
          handleDuplicateImage={handleDuplicateImage}
          onToggleLock={toggleLockImage}
          image={images[selectedImageIndex]}
        />
      )}
      <div className="grid grid-cols-12">
        <div className=" bg-[#f8f8f8e6] backdrop-blur-[10px] flex flex-col items-center pt-14">
          <div className="w-full flex flex-col gap-3">
            <button
              className="flex items-center justify-center flex-col w-[80%] mx-auto pb-2"
              onClick={addText}
            >
              <TfiText className="text-2xl" />
              Text
            </button>
            <button className="flex items-center justify-center flex-col w-[80%] mx-auto py-2">
              <AiFillAppstore className="text-2xl" />
              Designs
            </button>
            <button className="flex items-center justify-center flex-col w-[80%] mx-auto py-2 relative min-h-[64px]">
              <PiImageSquare className="text-2xl" />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full leading-[100px] cursor-pointer"
                onChange={handleImageUpload}
              />
            </button>
            <button className="flex items-center justify-center flex-col w-[80%] mx-auto py-2">
              <BiLogoGraphql className="text-2xl" />
              Graphics
            </button>
          </div>
        </div>

        <div className="relative h-[calc(100vh-80px)] col-span-11 bg-[#F8F8F8] pl-[100px] pr-[50px] py-5">
          <div className="">
            <img src={backgroundImg} alt="" />
            <Stage
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: "60%",
                left: "58%",
                transform: "translate(-46.5%,-50%)",
                border: "1px solid #08867F",
              }}
              ref={stageRef}
            >
              <Layer>
                {texts.map((text, i) => (
                  <React.Fragment key={i}>
                    <Text
                      key={i}
                      id={`text-${i}`}
                      {...text}
                      draggable={!text.locked}
                      onClick={() => {
                        setSelectedTextIndex(i);
                        setSelectedImageIndex(null);
                      }}
                      onTap={() => {
                        setSelectedTextIndex(i);
                        setSelectedImageIndex(null);
                      }}
                      onDragEnd={(e) => {
                        const newPosition = checkTextBounds(text, e.target);
                        const newTexts = texts.slice();
                        newTexts[i] = {
                          ...newTexts[i],
                          ...newPosition,
                        };
                        setTexts(newTexts);
                      }}
                      onTransformEnd={(e) => {
                        const newPosition = checkTextBounds(text, e.target);
                        const newTexts = texts.slice();
                        newTexts[i] = {
                          ...newTexts[i],
                          ...newPosition,
                          width: e.target.width(),
                          height: e.target.height(),
                        };
                        setTexts(newTexts);
                      }}
                    />
                  </React.Fragment>
                ))}
                {images.map((image, index) => (
                  <React.Fragment key={index}>
                    <Image
                      image={image.image}
                      id={`Image-${index}`}
                      width={image.width}
                      height={image.height}
                      offsetX={image.width / 2}
                      offsetY={image.height / 2}
                      rotation={image.rotation}
                      draggable={!image.locked}
                      onDragEnd={(e) => {
                        handleUpdateImage(index, {
                          x: e.target.x(),
                          y: e.target.y(),
                        });
                      }}
                      onTransformEnd={(e) => {
                        const node = e.target;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        const newWidth = Math.max(5, node.width() * scaleX);
                        const newHeight = Math.max(5, node.height() * scaleY);

                        handleUpdateImage(index, {
                          x: node.x(),
                          y: node.y(),
                          width: newWidth,
                          height: newHeight,
                        });
                      }}
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setSelectedTextIndex(null);
                      }}
                    />
                  </React.Fragment>
                ))}

                <Transformer
                  ref={transformerRef}
                  rotateEnabled={false}
                  anchorFill={"rgb(0, 161, 255)"}
                  anchorSize={4}
                  enabledAnchors={
                    !texts[selectedTextIndex]?.locked &&
                    !images[selectedImageIndex]?.locked
                      ? ["top-left", "top-right", "bottom-left", "bottom-right"]
                      : []
                  }
                  boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
