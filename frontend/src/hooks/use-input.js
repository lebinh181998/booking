import { useState } from "react";

const useInput = (resolveData, value) => {
  const [valueInput, setValueInput] = useState(value ? value : "");
  const [isTouched, setIsTouched] = useState(false);

  //   kiểm tra dữ liệu search có rỗng không
  const validInput = resolveData(valueInput);
  const errorInput = isTouched && !validInput;

  const eventChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const eventBlurInput = () => {
    setIsTouched(() => true);
  };

  const resetInput = () => {
    setValueInput("");
    setIsTouched(false);
  };

  return {
    value: valueInput,
    isError: errorInput,
    isValid: validInput,
    eventBlurInput,
    eventChangeInput,
    resetInput,
  };
};
export default useInput;
