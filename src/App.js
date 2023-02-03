import { useEffect, useState, useRef } from "react";
import Keyboard from "./components/Keyboard";
import Context from "./context";
import "./assets/css/main.css";

const App = () => {
  const [keyboard, setKeyboard] = useState([]);
  const [keyboardList, setKeyboardList] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [audioItem, setAudioItem] = useState({});
  const container = useRef();
  const audioWrapper = useRef();

  useEffect(() => {
    setKeyboard([
      "escape f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12",
      "` 1 2 3 4 5 6 7 8 9 0 * - backspace",
      "tab q w e r t y u i o p [ ] \\",
      "capslock a s d f g h j k l ; ' enter",
      "shift < z x c v b n m , . / shift",
      "control alt metaleft space metaright alt",
    ]);
  }, []);

  useEffect(() => {
    if (audioItem.pressKey) playAudio();
  }, [audioItem]);

  const keyHandle = (e) => {
    const pressKey = e.key === ' ' ? 'space' : e.key.toLocaleLowerCase();
    const [data] = keyList.filter((item) => pressKey === item.key);
    if (data) setAudioItem({...data, pressKey});

    if(e.keyCode === 27 && audioWrapper.current.children.length) audioWrapper.current.innerHTML = "";
  }

  const playAudio = () => {
    audioWrapper.current.innerHTML = "";
    const audioEl = new Audio();
    audioEl.controls = true;
    audioEl.src = audioItem.src;
    audioWrapper.current.append(audioEl);
    audioEl.play();
  };

  let data = {
    keyboard,
    setKeyboard,
    keyboardList,
    setKeyboardList,
    keyList,
    setKeyList,
    audioItem,
    setAudioItem,
    container,
    playAudio,
  };

  return (
    <Context.Provider value={data}>
      <div
        className="container"
        tabIndex={0}
        ref={container}
        onKeyDown={keyHandle}
      >
        {keyboard &&
          keyboard.map((item, index) => (
            <div className="row-item" key={index}>
              <Keyboard keyboardRow={item} />
              <br />
            </div>
          ))}
        <div className="playAudio" ref={audioWrapper}></div>
      </div>
    </Context.Provider>
  );
};

export default App;
