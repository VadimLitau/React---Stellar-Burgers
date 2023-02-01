import React, { FC, MouseEventHandler } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from "./Ingredient.module.css";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";

interface IIngredient {
  src: string;
  name: string;
  price: number;
  onCardClick: MouseEventHandler<HTMLImageElement>;
  id: string;
  count: number;
  type: string;
  index?: string;
}

const Ingredient: FC<IIngredient> = ({
  src,
  name,
  price,
  onCardClick,
  id,
  count,
  type,
  index,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isDrag }, dragRef] = useDrag({
    type: "item",
    item: { id, name, price, src, count, type, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location },
      }}
      key={id}
      className={IngredientStyle.link}
    >
      <li className={`${IngredientStyle.head} mt-6 mb-8`} ref={dragRef}>
        <img
          src={src}
          alt="ingridienImage"
          className={`mb-1`}
          onClick={onCardClick}
        />
        <div className={`${IngredientStyle.priceWrap} mb-1`}>
          <p
            className={`${IngredientStyle.price} mr-2 text text_type_digits-default`}
          >
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${IngredientStyle.name} text text_type_main-default`}>
          {name}
        </p>
        <div>
          <Counter count={count} size="default" />
        </div>
      </li>
    </Link>
  );
};

Ingredient.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.string,
};

export default Ingredient;
