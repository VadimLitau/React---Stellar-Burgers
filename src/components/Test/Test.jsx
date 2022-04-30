import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiBurgerData } from "../../services/actions";
import { useEffect } from "react";

export default function Test() {
  const tests = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "react burger";
    dispatch(getApiBurgerData());
  }, [dispatch]);

  //console.log(tests);
  return <h1>ghfgs</h1>;
}
