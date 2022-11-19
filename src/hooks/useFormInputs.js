import { useState } from "react";

export default function useFormInputs(init) {
  const [inputs, setInputs] = useState(init);

  const changeHandler = (e) => {
    const { target } = e;

    setInputs({
      ...inputs,
      [target.id]: target.value,
    });
  };

  const setAllInputsEmpty = () => {
    const emptyInputs = {};
    for (const inputId in inputs) {
      emptyInputs[inputId] = "";
    }

    setInputs(emptyInputs);
  };
  return { inputs, changeHandler, setAllInputsEmpty };
}
