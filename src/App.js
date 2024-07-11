import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text, Transformer, Image, Rect } from "react-konva";
import { TfiText } from "react-icons/tfi";
import "./App.css";
import Header from "./components/Header";
import { AiFillAppstore } from "react-icons/ai";
import { PiImageSquare } from "react-icons/pi";
import { BiLogoGraphql } from "react-icons/bi";
import TextEditor from "./components/TextEditor";
import ImageEditor from "./components/ImageEditor";
import backgroundImg from "./components/images/preview.jpg";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CommonPopover from "./components/pop-overs";
import GraphicsPopOver from "./components/pop-overs/GraphicsPopOver";
import RectShape from "./components/graphics/RectShape";

function App() {
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [scaleZoom, setScaleZoom] = useState("100%");
  const boundary = { x: 0, y: 0, width: 100, height: 100 };

  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  const transformerRef = useRef(null);
  const stageRef = useRef(null);

  const offsetX = 10;
  const offsetY = 10;
  const checkBoundaries = (node) => {
    const { x, y, width, height } = node.getClientRect();
    const stage = stageRef.current;
    console.log("==============", stage);
    console.log(x, boundary.x, width, boundary.width);

    // console.log(x >= boundary.x && x + width <= boundary.x + boundary.width);
    // console.log(y >= boundary.y && y + height <= boundary.y + boundary.height);

    const withinX = x >= boundary.x && x + width <= boundary.x + boundary.width;
    const withinY =
      y >= boundary.y && y + height <= boundary.y + boundary.height;
    return withinX && withinY;
  };

  const handleDragEnd = (e) => {
    const node = e.target;
    if (!checkBoundaries(node)) {
      node.to({
        x: boundary.x,
        y: boundary.y,
        duration: 0.5,
      });
    }
  };

  const addText = () => {
    setTexts([
      ...texts,
      {
        text: "Type text here",
        fontSize: 10,
        fontFamily: "Arial",
        fill: "black",
        align: "left",
        fontStyle: "",
        textDecoration: "",
        locked: false,
        x: 50,
        y: 50,
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
      x: texts[index].x + offsetX,
      y: texts[index].y + offsetY,
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

  const checkImageBounds = (image, node) => {
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

  const checkTextBounds = (text, node) => {
    const stage = stageRef.current;
    const stageWidth = stage.width();
    const stageHeight = stage.height();

    let newX = node.x();
    let newY = node.y();
    if (newX < 0) {
      newX = 0;
    } else if (newX + node.width() > stageWidth) {
      newX = stageWidth - node.width();
    }
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
            x: 0,
            y: 0,
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
      x: images[index].x + offsetX,
      y: images[index].y + offsetY,
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

  const bringTextToFront = (index) => {
    const textNode = stageRef.current.findOne(`#text-${index}`);
    textNode.moveToTop();
    setSelectedTextIndex(index);
  };

  const sendTextToBack = (index) => {
    const textNode = stageRef.current.findOne(`#text-${index}`);
    textNode.moveToBottom();
    setSelectedTextIndex(index);
  };

  const bringImageToFront = (index) => {
    const imageNode = stageRef.current.findOne(`#Image-${index}`);
    imageNode.moveToTop();
    setSelectedImageIndex(index);
  };

  const sendImageToBack = (index) => {
    const imageNode = stageRef.current.findOne(`#Image-${index}`);
    imageNode.moveToBottom();
    setSelectedImageIndex(index);
  };
  const addShape = () => {
    const defaultColor = "#637EF7";
    let shapeBase = {
      id: Math.random(),
      draggable: true,
      shadowBlur: 0,
      brightness: 0,
      blur: 0,
      contrast: 0,
      pixelSize: 1,
      fill: defaultColor,
      // filters: [
      //   Konva.Filters.Blur,
      //   ...(shape.type !== "text" && [
      //     Konva.Filters.Brighten,
      //     Konva.Filters.Contrast,
      //     Konva.Filters.Pixelate,
      //   ]),
      // ],
    };
    const shapeConfig = {};

    const shape = {
      ...shapeBase,
      type: "rectangle",
      y: shapeConfig.y ?? Math.random() * 100,
      x: shapeConfig.x ?? Math.random() * 100,
      width: shapeConfig.width ?? 50,
      height: shapeConfig.height ?? 50,
      fill: shapeConfig.fill ?? "#637EF7",
    };

    setImages(shape);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();
    const mousePointTo = {
      x: pointer.x / oldScale - stage.x() / oldScale,
      y: pointer.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1;
    setScale(newScale);

    const newPos = {
      x: -(mousePointTo.x - pointer.x / newScale) * newScale,
      y: -(mousePointTo.y - pointer.y / newScale) * newScale,
    };
    setStagePos(newPos);
  };

  const handleGraphicsClick = (e) => {};

  useEffect(() => {
    const stage = stageRef.current;
    stage.scale({ x: scale, y: scale });
    stage.position(stagePos);
    stage.batchDraw();
  }, [scale, stagePos]);

  console.log({ selectedImageIndex });

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
          bringToFront={() => bringTextToFront(selectedTextIndex)}
          sendToBack={() => sendTextToBack(selectedTextIndex)}
        />
      )}
      {selectedImageIndex !== null && (
        <ImageEditor
          selectedImageIndex={selectedImageIndex}
          handleDeleteImage={handleDeleteImage}
          handleDuplicateImage={handleDuplicateImage}
          onToggleLock={() => toggleLockImage(selectedImageIndex)}
          bringToFront={() => bringImageToFront(selectedImageIndex)}
          sendToBack={() => sendImageToBack(selectedImageIndex)}
          // handleRotateImage={handleRotateImage}
          // onToggleLock={toggleLockImage}
          image={images[selectedImageIndex]}
        />
      )}
      <div className="grid grid-cols-12">
        <div className=" bg-[#f8f8f8e6] backdrop-blur-[10px] flex flex-col items-center pt-14 fixed top-20 left-0 z-[999] px-5">
          <div className="w-full flex flex-col gap-3">
            <button className="flex items-center justify-center flex-col w-[80%] mx-auto pb-2 relative">
              <TfiText
                className="text-2xl"
                onClick={() => {
                  setIsTextBoxVisible(!isTextBoxVisible);
                  setSelectedTextIndex(null);
                }}
              />
              Text
              {isTextBoxVisible && (
                <div className="flex justify-center items-center absolute top-0 left-[100px] z-30 bg-gray-100">
                  {/*     z-index: 99;
    width: 400px;
    position: absolute;
    left: 50px;
    top: 0px;
    padding: 20px; */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <div className="text-left">
                      <h2 className="text-xl font-bold mb-4">Text</h2>
                      <p className="text-gray-500 mb-4 text-sm">
                        Edit your text below, or click on the field you'd like
                        to edit directly on your design.
                      </p>
                    </div>
                    {texts.map((text, i) => (
                      <input
                        type="text"
                        name="text"
                        value={text.text === "Type text here" ? "" : text.text}
                        className="Text-fild focus:outline-none border-b my-3"
                        placeholder="Type text here"
                        onChange={(e) =>
                          handleTextChange(i, "text", e.target.value)
                        }
                        onClick={() => {
                          setSelectedTextIndex(i);
                        }}
                      />
                    ))}
                    <button
                      className="w-full py-2 bg-black text-white font-semibold rounded-full mt-3"
                      onClick={addText}
                    >
                      New Text Field
                    </button>
                  </div>
                </div>
              )}
            </button>
            {/* <button onClick={addShape}> Add Shape </button> */}
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
            {/* <button className="flex items-center justify-center flex-col w-[80%] mx-auto py-2">
              <BiLogoGraphql className="text-2xl" />
              Graphics
            </button> */}
            <CommonPopover
              target={
                <button className="flex items-center justify-center flex-col w-full">
                  <BiLogoGraphql className="text-2xl" />
                  Graphics
                </button>
              }
            >
              <GraphicsPopOver handleClick={addShape} />
            </CommonPopover>
          </div>
        </div>
        {/* <TransformWrapper>
          <TransformComponent> */}
        {/* <Board /> */}
        <div
          className="relative h-[calc(100vh-200px)] col-span-11 bg-[#F8F8F8] pl-[100px] pr-[50px] py-5"
          style={{
            scale: scaleZoom,
            // zoom: scaleZoom,
          }}
        >
          <div className="">
            <img src={backgroundImg} alt="" />
            <Stage
              width={100}
              height={100}
              style={{
                position: "absolute",
                // top: "60%",
                top: "500px",
                left: "58%",
                transform: "translate(-46.5%,-50%)",
                border: "1px solid #08867F",
              }}
              ref={stageRef}
              onWheel={handleWheel}
            >
              <Layer>
                <RectShape />
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
                        setIsTextBoxVisible(true);
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
                        console.log("start :", {
                          newPosition,
                          newTexts,
                        });
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
                        console.log("stop :", {
                          newPosition,
                          newTexts,
                        });
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
                      // width={image.width / 2}
                      // height={image.height / 2}
                      // offsetX={image.width - 10}
                      // offsetY={50}
                      // offsetX={image.width / 2}
                      // offsetY={image.height / 2}
                      // rotation={image.rotation}
                      {...image}
                      // x={0}
                      // y={0}
                      // offsetX={image.width / 7}
                      // offsetY={image.height / 7}
                      draggable={!image.locked}
                      // onDragEnd={(e) => {
                      //   handleUpdateImage(index, {
                      //     x: e.target.x(),
                      //     y: e.target.y(),
                      //   });
                      // }}
                      onDragEnd={handleDragEnd}
                      //
                      // onDragEnd={(e) => {
                      //   const newPosition = checkTextBounds(image, e.target);
                      //   const newImages = images.slice();
                      //   newImages[index] = {
                      //     ...newImages[index],
                      //     ...newPosition,
                      //   };
                      //   console.log("start :", { newPosition, newImages });
                      //   setImages(newImages);
                      // }}
                      // onTransformEnd={(e) => {
                      //   const newPosition = checkTextBounds(image, e.target);
                      //   const newImages = texts.slice();
                      //   newImages[index] = {
                      //     ...newImages[index],
                      //     ...newPosition,
                      //     width: e.target.width(),
                      //     height: e.target.height(),
                      //   };
                      //   console.log("stop :", { newPosition, newImages });
                      //   setImages(newImages);
                      // }}
                      // onTransformEnd={(e) => {
                      //   const node = e.target;
                      //   const scaleX = node.scaleX();
                      //   const scaleY = node.scaleY();

                      //   const newWidth = Math.max(5, node.width() * scaleX);
                      //   const newHeight = Math.max(5, node.height() * scaleY);

                      //   handleUpdateImage(index, {
                      //     x: node.x(),
                      //     y: node.y(),
                      //     width: newWidth,
                      //     height: newHeight,
                      //   });
                      // }}
                      onClick={() => {
                        console.log({ index });
                        setSelectedImageIndex(index);
                        setSelectedTextIndex(null);
                      }}
                    />
                  </React.Fragment>
                ))}

                <Transformer
                  ref={transformerRef}
                  rotateEnabled={
                    !texts[selectedTextIndex]?.locked &&
                    !images[selectedImageIndex]?.locked
                      ? true
                      : false
                  }
                  rotateAnchorOffset={10}
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
        {/* </TransformComponent>
        </TransformWrapper> */}
      </div>
      {/* toolbar footer */}
      <div className="bg-black/30 p-5 w-full fixed bottom-0 left-0">
        <div className="w-[300px]">
          <Slider
            min={50}
            max={150}
            defaultValue={100}
            // value={scaleZoom}
            // handle={(props) => <div {...props}></div>}
            onChange={(value) => setScaleZoom(value + "%")}
            // onChange={(value) => setScale(`${value * 2}%`)}
          />
        </div>
        {/* <div className="tools">
          <button onClick={() => zoomIn()}>+</button>
          <button onClick={() => zoomOut()}>-</button>
          <button onClick={() => resetTransform()}>x</button>
        </div> */}
      </div>
    </>
  );
}

// const Board = () => {
//   const { zoomIn, zoomOut, resetTransform } = useControls();
//   return (
//     <TransformWrapper
//       initialScale={1}
//       initialPositionX={200}
//       initialPositionY={100}
//     >
//       {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//         <>
//           <button onClick={() => zoomIn()}>+</button>
//           <button onClick={() => zoomOut()}>-</button>
//           <button onClick={() => resetTransform()}>x</button>
//           <TransformComponent>
//             <div>Example text</div>
//           </TransformComponent>
//         </>
//       )}
//     </TransformWrapper>
//   );
// };

export default App;
