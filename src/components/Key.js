import { useRef, useContext, memo } from "react";
import Context from "../context";
import AudioText from "./AudioText";
import { uploadData } from "../config/Storage";

const Key = ({ keyData }) => {
  const inpFile = useRef();
  const filesArea = useRef();
  const removeAudio = useRef();

  const { keyList, setKeyList, setAudioItem, setLoading } = useContext(Context);

  const handleDrag = (e) => {
    if (e.type === "dragenter" || e.type === "dragover") {
      filesArea.current.classList.add("drag-active");
    } else {
      filesArea.current.classList.remove("drag-active");
    }
  };

  const handleDrop = () => {
    filesArea.current.classList.remove("drag-active");
  };

  const changeInput = async () => {
    setLoading(true);
    const file = inpFile.current.files[0];
    const src = await uploadData(file);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      inpFile.current.classList.add("none");
      const data = {
        name: file.name,
        key: keyData,
        src,
      };
      setKeyList([...keyList, data]);
      setLoading(false);
    });
    reader.readAsDataURL(file);
  };

  const showRemoveBtn = () => {
    removeAudio.current?.classList.add("show-btn");
  };

  const hideRemoveBtn = () => {
    removeAudio.current?.classList.remove("show-btn");
  };

  const removeAudioFn = (key) => {
    const list = keyList.filter((item) => item.key !== key);
    setKeyList(list);
    inpFile.current.classList.remove("none");
  };

  const handleDC = () => {
    const currentAudio = keyList.filter(({ key }) => key === filesArea.current.dataset.key);
    setAudioItem(...currentAudio);
  };

  return (
    <>
      <div
        className="key-item"
        data-key={keyData}
        onDoubleClick={handleDC}
        ref={filesArea}
        onMouseMove={showRemoveBtn}
        onMouseLeave={hideRemoveBtn}
      >
        <span>{keyData}</span>
        <div
          className="files-area"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="file"
            id="file"
            accept=".mp3,.wav"
            onChange={changeInput}
            ref={inpFile}
          />
          {keyList.map(
            (item, index) =>
              item.key === keyData && (
                <div key={index}>
                  <AudioText audioData={item} />
                  <div
                    className="remove-audio"
                    ref={removeAudio}
                    onClick={() => removeAudioFn(keyData)}
                  >
                    <span>x</span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Key);
