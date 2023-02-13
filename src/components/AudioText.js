import { memo } from "react";

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
