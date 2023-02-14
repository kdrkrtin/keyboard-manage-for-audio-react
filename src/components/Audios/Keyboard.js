import { memo } from "react";
import Key from "./Key";

const Keyboard = ({ keyboardRow }) => {
  const keys = keyboardRow.split(' ');
  return (
    <>
      {keyboardRow &&
        keys.map((key, index) => <Key keyData={key} key={index} />)}
    </>
  );
};

export default memo(Keyboard);
