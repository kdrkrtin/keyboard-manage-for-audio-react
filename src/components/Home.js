import { useEffect, useState, useRef, useContext } from "react";
import Keyboard from "components/Audios/Keyboard";
import Context from "context";
import Loading from "components/Loading";
import { getAudios } from "config/GetAudioList";
import { setAudios } from "config/SetAudioList";

const Home = () => {
  const [keyboard, setKeyboard] = useState([]);
  const [keyboardList, setKeyboardList] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [audioItem, setAudioItem] = useState({});
  const [audioEl, setAudioEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const container = useRef();
  const audioWrapper = useRef();

  const { authToken } = useContext(Context);

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
    if (audioItem.key) playAudio();
  }, [audioItem]);

  useEffect(() => {
    if (keyList.length) setAudios(keyList);
  }, [keyList]);

  useEffect(() => {
    if (authToken)
      getAudios().then((res) => {
        setKeyList(res.val() || []);
        setLoading(false);
      });
  }, [authToken]);

  const keyHandle = (e) => {
    let pressKey = "";
    if (e.key === " ") {
      pressKey = e.key === " " ? "space" : e.key.toLocaleLowerCase();
      if (audioEl !== null) {
        !audioEl.paused ? audioEl.pause() : audioEl.play();
      }
    }
    pressKey = e.key.toLocaleLowerCase();
    const [data] = keyList.filter((item) => pressKey === item.key);
    if (data) setAudioItem({ ...data, pressKey });

    if (e.keyCode === 27 && audioWrapper.current.children.length)
      audioWrapper.current.innerHTML = "";
  };

  const playAudio = () => {
    audioWrapper.current.innerHTML = "";
    const aud = new Audio();
    aud.controls = true;
    aud.src = audioItem.src;
    audioWrapper.current.append(aud);
    setAudioEl(aud);
    aud.play();
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
    setLoading,
  };

  return (
    <>
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
        <Loading loading={loading} />
      </Context.Provider>
    </>
  );
};

export default Home;
