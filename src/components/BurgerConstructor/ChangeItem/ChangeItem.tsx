import React, { FC } from "react";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "../../../services/hooks";
import { DELETE_ITEM, CHANGE_ITEM } from "../../../services/constants/index";
import ChangeStyle from "./ChangeItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IChangeItem, IChangeElem } from "../../../services/types/data";

const ChangeItem: FC<IChangeItem> = ({ item, index }) => {
  const ref = React.useRef(null);

  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { item: item, index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const deleteElement = (item: IChangeElem) => {
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item: IChangeItem) {
      changeItem(index, item);
    },
  });

  drag(drop(ref));

  const changeItem = (hoverIndex: number, item: IChangeItem) => {
    dispatch({
      type: CHANGE_ITEM,
      dragItem: item.item,
      dragIndex: item.index,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <li
      ref={ref}
      style={{ opacity }}
      className={`${ChangeStyle.element}  mb-4 pr-2`}
    >
      <span className={`mr-2`}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.src}
        handleClose={() => {
          deleteElement(item);
        }}
      />
    </li>
  );
};

ChangeItem.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ChangeItem;
