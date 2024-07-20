import React, { useState } from "react";
const moods = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  excited: "😃",
  anxious: "😰",
  tired: "😴",
  bored: "😐",
  surprised: "😲",
};
const Moodtracker = ({ setMood }) => {
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setMood(moods[mood]);
  };
  return (
    <div className="container   mt-2 ">
      <div className="d-flex  flex-wrap">
        {Object.keys(moods).map((mood) => (
          <div
            key={mood}
            className={`  ${
              selectedMood === mood
                ? " text-white  rounded border "
                : "border-0"
            }`}
            style={{ fontSize: "1.5rem", cursor: "pointer", height: "2.5rem" }}
            onClick={() => handleMoodClick(mood)}
          >
            {moods[mood]}
          </div>
        ))}
      </div>
      {selectedMood && (
        <div className="d-flex justify-content-center ">
          <p
            style={{
              fontSize: "1.3rem",
              width: "3.2rem",
              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.5)",
              padding: ".4rem .6rem",
            }}
            className="mt-3"
          >
            {moods[selectedMood]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Moodtracker;
