// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, SetStateAction, useState } from "react";

const useForm = () => {
  interface IUseForm {
    name: string;
    email: string;
    password: string;
  }
  const [state, setState] = useState<IUseForm & any>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: SetStateAction<IUseForm> & ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    setState((state: IUseForm) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return [state, handleChange];
};
export default useForm;
