import React from "react";
import Ingridient from "../Ingridient/Ingridient";
import List from "./IngridientsList.module.css";
import PropTypes from "prop-types";

export default function IngridientsList({ data, name }) {
  return (
    <section className={List.head}>
      <p className={`text text_type_main-medium mt-10 mb-6`}>{name}</p>
      <ul className={`${List.item} ml-4 mr-4`}>
        {data.map((item) => (
          <Ingridient
            name={item.name}
            key={item._id}
            src={item.image}
            price={item.price}
          />
        ))}
      </ul>
    </section>
  );
}
