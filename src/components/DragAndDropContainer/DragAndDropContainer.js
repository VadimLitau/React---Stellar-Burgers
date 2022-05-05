import React, { useContext, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragAndDropContainer = () => {
    const [elements, setElements] = React.useState([]);
    const [draggedElements, setDraggedElements] = React.useState([]);

    const handleDrop = (itemId) => {
        setElements([
            ...elements.filter(element => element.id !== itemId.id)
        ]);

        setDraggedElements([
            ...draggedElements,
            ...elements.filter(element => element.id === itemId.id)
        ]);
    };

    return ( < ConstructorElement type = "top" / > )
}

export default DragAndDropContainer