import { memo } from "react";
// import Context from "../context";

const AudioText = ({ audioData }) => {
  return (
    <>
      <div className="audio-div" data-src={audioData.src}>
        <span>{audioData.name}</span>
      </div>
    </>
  );
};

export default memo(AudioText);
