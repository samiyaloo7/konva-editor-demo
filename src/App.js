import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Text,
  Transformer,
  Image,
  Rect,
  Circle,
  Shape,
  RegularPolygon,
  Arrow,
  Star,
  Line,
} from "react-konva";
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
import ShapeEditor from "./components/ShapeEditor";
import SizeDrawer from "./components/SizeDrawer";

function App() {
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [scaleZoom, setScaleZoom] = useState("100%");
  const [showChangeSize, setShowChangeSize] = useState(false);
  const [boundary, setBoundary] = useState({
    x: 500,
    y: 900,
    width: 150,
    height: 150,
  });

  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  const transformerRef = useRef(null);
  const stageRef = useRef(null);
  const targetImageRef = useRef(null);

  const [itemIndex, setItemIndex] = useState(0);

  const offsetX = 10;
  const offsetY = 10;
  const checkBoundaries = (node) => {
    const { x, y, width, height } = node.getClientRect();

    const withinX = x >= 0 && x + width <= 0 + boundary.width;
    const withinY = y >= 0 && y + height <= 0 + boundary.height;

    return withinX && withinY;
  };

  const handleTextDragEnd = (e) => {
    const node = e.target;
    if (!checkBoundaries(node)) {
      node.to({
        x: boundary.width / 2 - node.width() / 2,
        y: boundary.height / 2,
        duration: 0.5,
      });
    }
  };

  const handleDragEnd = (e, shape) => {
    const node = e.target;
    if (!checkBoundaries(node)) {
      if (shape === "arrow") {
        node.to({
          x: boundary.width / 4,
          y: boundary.height / 8,
          duration: 0.5,
        });
      } else if (shape === "image") {
        node.to({
          x: boundary.width / 4,
          y: boundary.height / 4,
          duration: 0.5,
        });
      } else {
        node.to({
          x: boundary.width / 2 + node.width() / 2,
          y: boundary.height / 2 + node.height() / 2,
          duration: 0.5,
        });
      }
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
        x: boundary.width / 2,
        y: boundary.height / 2,
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

  const handleChangeColor = (index, key, value) => {
    const newShape = shapes.slice();
    newShape[index] = {
      ...newShape[index],
      [key]: value,
    };
    setShapes(newShape);
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
        newTexts[index].wrap = true;
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
    if (newTexts[index].locked) {
      transformerRef.current.nodes([]);
    } else {
      const selectedNode = stageRef.current.findOne(`#text-${index}`);
      transformerRef.current.nodes([selectedNode]);
    }
    setTexts(newTexts);
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
    } else if (selectedShapeIndex !== null) {
      const selectedNode = stageRef.current.findOne(
        `#Shape-${selectedShapeIndex}`
      );
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedTextIndex, selectedImageIndex, selectedShapeIndex]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        const ratio = Math.min(
          (boundary.width - 5) / img.width,
          (boundary.height - 5) / img.height
        );

        setImages([
          ...images,
          {
            image: img,
            x: 10,
            y: 10,
            width: img.width * ratio,
            height: img.height * ratio,
            rotation: 0,
            locked: false,
          },
        ]);
      };
    };

    reader.readAsDataURL(file);
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
    if (newImages[index].locked) {
      transformerRef.current.nodes([]);
    } else {
      const selectedNode = stageRef.current.findOne(`#Image-${index}`);
      transformerRef.current.nodes([selectedNode]);
    }
    transformerRef.current.getLayer().batchDraw();
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

  const bringToTop = (target) => {
    const targetItem = itemIndex + 1;

    setTimeout(() => {
      console.log(`#${target}-${targetItem}`);
      stageRef?.current?.findOne(`#${target}-${targetItem}`)?.moveToTop();
      setItemIndex(targetItem);
    }, 2000);
  };

  const addShape = (selectedShape) => {
    const shapeProps = {
      item: selectedShape,
      x: boundary.width / 2,
      y: boundary.height / 2,
      width: 30,
      height: 30,
      fill: "black",
    };

    if (selectedShape === "arrow") {
      shapeProps.point = [0, 50, 50, 50];
    }

    setShapes((prev) => [
      ...prev,
      {
        ...shapeProps,
      },
    ]);

    bringToTop("Shape");
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

  const handleDeleteShape = (index) => {
    setShapes((prevShapes) => {
      const test = prevShapes.map((shape, i) => {
        if (["line"].includes(shapes[index]?.item))
          return i === index
            ? { ...shape, point: [], x: 1, y: 1, height: 1, width: 1 }
            : shape;
        if (["star"].includes(shapes[index]?.item))
          return i === index
            ? {
                ...shape,
                numPoints: 0,
                innerRadius: 0,
                outerRadius: 0,
                x: 1,
                y: 1,
                height: 1,
                width: 1,
              }
            : shape;
        if (["arrow"].includes(shapes[index]?.item))
          return i === index
            ? {
                ...shape,
                pointerLength: 0,
                pointerWidth: 0,
                point: [0, 0, 0, 0],

                deleted: true,
                height: 1,
                width: 1,
              }
            : shape;
        if (["two-sided-arrow"].includes(shapes[index]?.item))
          return i === index
            ? {
                ...shape,
                sceneFunc: true,
                x: 1,
                y: 1,
                height: 1,
                width: 1,
                strokeWidth: 0,
              }
            : shape;
        else if (["polygon", "triangle"].includes(shapes[index]?.item))
          return i === index
            ? {
                ...shape,
                radius: 1,
                sides: 1,
                x: 1,
                y: 1,
                height: 1,
                width: 1,
              }
            : shape;
        else
          return i === index
            ? { ...shape, x: 1, y: 1, height: 1, width: 1 }
            : shape;
      });
      console.log(test);
      return test;
    });
    setSelectedShapeIndex(null);
  };

  const handleShapeDuplicate = (index) => {
    const newTexts = shapes.slice();
    newTexts.push({
      ...shapes[index],
      x: shapes[index].x + offsetX,
      y: shapes[index].y + offsetY,
    });
    setShapes(newTexts);
  };

  const sendShapeToBack = (index) => {
    const textNode = stageRef.current.findOne(`#Shape-${index}`);
    textNode.moveToBottom();
    setSelectedShapeIndex(index);
  };

  const bringShapeToFront = (index) => {
    const imageNode = stageRef.current.findOne(`#Shape-${index}`);
    imageNode.moveToTop();
    setSelectedShapeIndex(index);
  };

  const onToggleLockShape = (index) => {
    const newTexts = shapes.slice();
    newTexts[index] = {
      ...newTexts[index],
      locked: !newTexts[index].locked,
    };
    if (newTexts[index].locked) {
      transformerRef.current.nodes([]);
    } else {
      const selectedNode = stageRef.current.findOne(`#Shape-${index}`);
      transformerRef.current.nodes([selectedNode]);
    }
    transformerRef.current.getLayer().batchDraw();
    setShapes(newTexts);
  };

  const handleSavePositions = (e, i) => {
    const tempShapes = [];

    shapes.forEach((element, idx) => {
      if (idx === i) {
        console.log("odd : ", element);
        tempShapes.push({
          ...element,
          x: e.target.x(),
          y: e.target.y(),
        });
      } else {
        console.log("normal : ", element);
        tempShapes.push(element);
      }
    });
    setShapes(tempShapes);
  };

  useEffect(() => {
    const stage = stageRef.current;
    stage.scale({ x: scale, y: scale });
    stage.position(stagePos);
    stage.batchDraw();
  }, [scale, stagePos]);

  const refreshStage = () => {
    setBoundary((prev) => ({
      ...prev,
      x: (targetImageRef.current.height * 500) / 1534,
      y: (targetImageRef.current.width * 900) / 1534,
      height: (targetImageRef.current.height * 150) / 1534,
      width: (targetImageRef.current.width * 150) / 1534,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", refreshStage, true);
    window.addEventListener("load", refreshStage);

    return () => {
      window.removeEventListener("resize", refreshStage);
      window.removeEventListener("load", refreshStage);
    };
  }, []);

  return (
    <>
      <Header
        showChangeSize={showChangeSize}
        setShowChangeSize={setShowChangeSize}
      />
      {showChangeSize && (
        <SizeDrawer
          boundary={boundary}
          setBoundary={setBoundary}
          setShowChangeSize={setShowChangeSize}
        />
      )}
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
          image={images[selectedImageIndex]}
        />
      )}
      {selectedShapeIndex !== null && (
        <ShapeEditor
          handleDeleteShape={handleDeleteShape}
          selectedShapeIndex={selectedShapeIndex}
          shape={shapes[selectedShapeIndex]}
          handleChangeColor={handleChangeColor}
          handleShapeDuplicate={handleShapeDuplicate}
          bringShapeToFront={bringShapeToFront}
          sendShapeToBack={sendShapeToBack}
          onToggleLock={onToggleLockShape}
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
        <div
          className="relative h-[calc(100vh-200px)] col-span-11 bg-[#F8F8F8] pl-[100px] pr-[50px] py-5"
          style={{
            scale: scaleZoom,
          }}
        >
          <div className="relative">
            <img ref={targetImageRef} src={backgroundImg} alt="" />
            <Stage
              width={boundary.width}
              height={boundary.height}
              style={{
                position: "absolute",
                top: boundary.x + "px",
                left: boundary.y + "px",
                transform: "translate(-46.5%,-50%)",
                border: "1px solid #08867F",
              }}
              ref={stageRef}
              onWheel={handleWheel}
            >
              <Layer>
                {images.map((image, index) => (
                  <React.Fragment key={index}>
                    <Image
                      image={image.image}
                      id={`Image-${index}`}
                      {...image}
                      draggable={!image.locked}
                      onDragEnd={(e) => {
                        handleDragEnd(e, "image");
                      }}
                      x={(boundary.width - image.width) / 2}
                      Y={(boundary.height - image.height) / 2}
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setSelectedTextIndex(null);
                        setSelectedShapeIndex(null);
                      }}
                    />
                  </React.Fragment>
                ))}
                {texts.map((text, i) => (
                  <React.Fragment key={i}>
                    <Text
                      key={i}
                      id={`text-${i}`}
                      {...text}
                      wrap="char"
                      draggable={!text.locked}
                      onClick={() => {
                        setSelectedTextIndex(i);
                        setSelectedImageIndex(null);
                        setSelectedShapeIndex(null);
                        setIsTextBoxVisible(true);
                      }}
                      align="center"
                      onTap={() => {
                        setSelectedTextIndex(i);
                        setSelectedShapeIndex(null);
                        setSelectedImageIndex(null);
                      }}
                      onDragEnd={(e) => {
                        handleDragEnd(e, "text");
                      }}
                    />
                  </React.Fragment>
                ))}

                {shapes?.map((shape, i) => {
                  const { item, ...others } = shape;

                  switch (item) {
                    case "rect":
                      return (
                        <Rect
                          key={i}
                          id={`Shape-${i}`}
                          {...others}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width}
                          offsetY={others.height}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "round":
                      return (
                        <Circle
                          key={i}
                          id={`Shape-${i}`}
                          {...others}
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "triangle":
                      return (
                        <RegularPolygon
                          key={i}
                          id={`Shape-${i}`}
                          sides={others?.sides ?? 3}
                          radius={others?.radius ?? 15}
                          fill={others.fill}
                          rotation={0}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "two-sided-arrow":
                      return (
                        <Shape
                          key={i}
                          id={`Shape-${i}`}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          // height={others?.sceneFunc ? 0 : others.height}
                          // width={others?.width ? 0 : others.width}
                          // height={others?.sceneFunc ? 0 : others.height}
                          // width={others?.sceneFunc ? 0 : others.width}
                          height={0}
                          width={0}
                          sceneFunc={
                            others?.sceneFunc
                              ? (context, shape) => {
                                  context.beginPath();
                                  context.moveTo(0, 0);
                                  context.closePath();
                                  context.fillStrokeShape(shape);
                                }
                              : (context, shape) => {
                                  context.beginPath();
                                  context.moveTo(0, 0);
                                  context.lineTo(15, 0);
                                  context.lineTo(15, -10);
                                  context.lineTo(30, 0);
                                  context.lineTo(15, 10);
                                  context.lineTo(15, 0);
                                  context.lineTo(-15, 0);
                                  context.lineTo(-15, -10);
                                  context.lineTo(-30, 0);
                                  context.lineTo(-15, 10);
                                  context.lineTo(-15, 0);
                                  context.closePath();
                                  context.fillStrokeShape(shape);
                                }
                          }
                          fill={others.fill}
                          stroke={others.fill}
                          strokeWidth={4}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "polygon":
                      return (
                        <RegularPolygon
                          key={i}
                          id={`Shape-${i}`}
                          sides={others?.sides ?? 5}
                          radius={others?.radius ?? 15}
                          fill={others.fill}
                          rotation={0}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "arrow":
                      return (
                        <Arrow
                          key={i}
                          id={`Shape-${i}`}
                          // points={[0, 0, 0, 0]}
                          // pointerLength={0}
                          // pointerWidth={0}
                          points={
                            others?.deleted ? [0, 0, 0, 0] : [0, 50, 50, 50]
                          } //
                          pointerLength={others?.deleted ? 0 : 20}
                          pointerWidth={others?.deleted ? 0 : 20}
                          // points={others?.points} // [0, 50, 50, 50]
                          // pointerLength={others?.pointerLength}
                          // pointerWidth={others?.pointerWidth}
                          fill={others.fill}
                          stroke={others.fill}
                          strokeWidth={4}
                          x={
                            boundary.width / 4
                            // initialPos.x
                            // 50
                            // others?.width
                            //   ? others?.width / 2
                            //   : boundary.width / 2
                          }
                          y={
                            boundary.width / 8
                            // initialPos.y
                            // 30
                            // others?.height
                            //   ? others?.height / 2
                            //   : boundary.height / 2
                          }
                          // x={boundary.width / 2 + others.width / 2}
                          // y={boundary.height / 2 + others.height / 2}
                          // offsetX={25}
                          // offsetY={25}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                          draggable={!shape.locked}
                        />
                      );
                    case "star":
                      return (
                        <Star
                          key={i}
                          id={`Shape-${i}`}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          numPoints={others?.numPoints ?? 5}
                          innerRadius={others?.innerRadius ?? 10}
                          outerRadius={others?.outerRadius ?? 20}
                          fill={others.fill}
                          stroke={others.fill}
                          strokeWidth={4}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    case "line":
                      return (
                        <Line
                          key={i}
                          id={`Shape-${i}`}
                          // x={
                          //   others?.width
                          //     ? others?.width / 2
                          //     : boundary.width / 2
                          // }
                          // y={
                          //   others?.height
                          //     ? others?.height / 2
                          //     : boundary.height / 2
                          // }
                          x={boundary.width / 2 + others.width / 2}
                          y={boundary.height / 2 + others.height / 2}
                          offsetX={others.width / 2}
                          offsetY={others.height / 2}
                          points={others?.point ?? [5, 5, 70, 5]}
                          stroke={others.fill}
                          strokeWidth={3}
                          lineCap={"round"}
                          lineJoin={"round"}
                          onClick={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          onTap={() => {
                            setSelectedTextIndex(null);
                            setSelectedImageIndex(null);
                            setSelectedShapeIndex(i);
                          }}
                          draggable={!shape.locked}
                          onDragEnd={(e) => {
                            handleSavePositions(e, i);
                            handleDragEnd(e, item);
                          }}
                        />
                      );
                    default:
                      return <></>;
                  }
                })}

                <Transformer
                  ref={transformerRef}
                  rotateEnabled={
                    !texts[selectedTextIndex]?.locked &&
                    !images[selectedImageIndex]?.locked &&
                    !shapes[selectedShapeIndex]?.locked
                      ? true
                      : false
                  }
                  resizeEnabled={true}
                  rotateAnchorOffset={10}
                  anchorFill={"rgb(0, 161, 255)"}
                  anchorSize={4}
                  enabledAnchors={
                    !texts[selectedTextIndex]?.locked &&
                    !images[selectedImageIndex]?.locked &&
                    !shapes[selectedShapeIndex]?.locked
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
      {/* toolbar footer */}
      <div className="bg-black/30 p-5 w-full fixed bottom-0 left-0">
        <div className="w-[300px]">
          <Slider
            min={50}
            max={150}
            defaultValue={100}
            onChange={(value) => {
              setScaleZoom(value + "%");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
