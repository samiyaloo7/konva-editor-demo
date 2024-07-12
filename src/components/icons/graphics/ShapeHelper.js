import Konva from "konva";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useShapeHelper = () => {
  const [shapes, setShapes] = useState([]);
  const generateShape = (shape) => {
    if ("filters" in shape) {
      // eslint-disable-next-line no-param-reassign
      delete shape.filters;
    }

    console.log("generateShape");

    const defaultColor = "#637EF7";
    let created = {
      id: shape.id ?? uuidv4(),
      draggable: true,
      shadowBlur: 0,
      brightness: 0,
      blur: 0,
      contrast: 0,
      pixelSize: 1,
      fill: defaultColor,
      filters: [
        Konva.Filters.Blur,
        ...(shape.type !== "text" && [
          Konva.Filters.Brighten,
          Konva.Filters.Contrast,
          Konva.Filters.Pixelate,
        ]),
      ],
    };

    switch (shape.type) {
      case "circle":
      case "ellipse":
        created = {
          ...created,
          ...shape,
          type: "ellipse",
          y: shape.y ?? Math.random() * 100,
          x: shape.x ?? Math.random() * 100,
          rotation: shape.rotation ?? 0,
          radiusX: shape.radiusX ?? 50,
          radiusY: shape.radiusY ?? 50,
          fill: shape.fill ?? defaultColor,
        };
        break;

      case "rectangle":
      case "rect":
        created = {
          ...created,
          ...shape,
          type: "rectangle",
          y: shape.y ?? Math.random() * 100,
          x: shape.x ?? Math.random() * 100,
          width: shape.width ?? 50,
          height: shape.height ?? 50,
          fill: shape.fill ?? "#637EF7",
        };
        break;

      case "text":
        created = {
          ...created,
          ...shape,
          type: "text",
          rotation: shape.rotation ?? 0,
          y: shape.y ?? Math.random() * 100,
          x: shape.x ?? Math.random() * 100,
          fill: shape.fill ?? "#637EF7",
          text: shape.text ?? "Double click to edit",
          fontSize: shape.fontSize ?? 28,
          fontStyle: shape.fontStyle ?? "normal",
          align: shape.align ?? "left",
          wrap: shape.wrap ?? "word",
        };
        break;

      case "line":
        created = {
          ...created,
          stroke: shape.stroke ?? "#637EF7",
          ...shape,
        };
        break;

      case "image":
        created = {
          ...created,
          ...shape,
          y: shape.x ?? Math.random() * 100,
          x: shape.y ?? Math.random() * 100,
          fill: undefined,
        };
        break;

      default:
        break;
    }

    return created;
  };

  const addShape = (shape) => {
    const created = (Array.isArray(shape) ? shape : [shape]).map((option) =>
      generateShape(option)
    );

    console.log("add shape :", created);
    console.log(shapes.concat(created));

    setShapes(shapes.concat(created));

    // saveHistory(shapes.concat(created));

    return created;
  };
};

export default useShapeHelper;
