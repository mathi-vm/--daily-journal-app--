import React, { useState, useEffect } from "react";
import TagInput from "../../Components/input/TagInput";
import Moodtracker from "../../Components/input/Moodtracker";
import axiosInstance from "../../Components/Controller/axiosInstance";
import { IoMdClose } from "react-icons/io";
import LocationTracker from "../../Components/input/LocationTracker";

const AddEditNote = ({ onClose, type, getAllNotes, journalData }) => {
  //State variables for journal data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [mood, setMood] = useState("");
  const [savedlocation, setSavedlocation] = useState("");
  const [location, setLocation] = useState({
    formattedAddress: "",
    latitude: null,
    longitude: null,
  });
  //hook to load journal data if editing
  useEffect(() => {
    if (type === "edit" && journalData) {
      setTitle(journalData.title);
      setContent(journalData.content);
      setTags(journalData.tags);
      setMood(journalData.mood);
      setSavedlocation(journalData.savedLocation);
      setLocation(
        journalData.location || {
          formattedAddress: "",
          latitude: null,
          longitude: null,
        }
      );

      
    }
  }, [type, journalData]);
  // Function to add a new journal entry
  const addNewJournal = async () => {
    const newJournal = {
      title,
      content,
      savedlocation,
      tags,
      mood,
      location: {
        formattedAddress: location.formattedAddress,
      },
      date: new Date().toISOString(),
    };

    try {
      const response = await axiosInstance.post(
        "/api/journal/create",
        newJournal
      );
      console.log("Note added:", response.data);
      getAllNotes();
      onClose();
    } catch (error) {
      console.error("Failed to add note:", error);
      setError("Failed to add note. Please try again.");
    }
  };
  //Function to edit an existing journal entry
  const editJournal = async () => {
    const updatedJournal = {
      title,
      content,
      tags,
      savedlocation,
      mood: mood || null,
      location: {
        formattedAddress: location.formattedAddress,
      },
    };

    try {
      const response = await axiosInstance.put(
        `/api/journal/update/${journalData._id}`,
        updatedJournal
      );
      console.log("Note updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Failed to update note:", error);
      setError("Failed to update note. Please try again.");
    }
  };
  // Handle form submission
  const handleAddJournal = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    if (type === "edit") {
      editJournal();
    } else {
      addNewJournal();
    }
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-end">
          {/* Close button */}
          <button
            className="fw-medium p-2"
            style={{ background: "none", outline: "none", border: "none" }}
            onClick={onClose}
          >
            <IoMdClose size={35} />
          </button>
        </div>
        {/* Mood tracker */}
        <div className="d-flex justify-content-end">
          <div
            className="mt-4 p-1"
            style={{
              background: "lightblue",
              border: "none",
              outline: "green",
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.5)",
              width: "19rem",
            }}
          >
            <label className="fw-medium text-secondary">
              How was your Mood
            </label>
            <Moodtracker setMood={setMood} />
          </div>
        </div>
        {/* Title input */}
        <div className="d-flex mt-5 flex-column gap-2">
          <label className="fw-medium text-secondary">TITLE</label>
          <input
            type="text"
            className="fs-6 text-secondary p-2 bg-white"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
            }}
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        {/* Content textarea */}

        <div className="d-flex flex-column gap-2">
          <label className="fs-6 mt-4 fw-medium text-secondary">CONTENT</label>
          <textarea
            className="text-secondary p-2 bg-white"
            style={{
              background: "none",
              border: "none",
              outline: "green",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
            }}
            placeholder="Write here..."
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        {/* Tags input */}
        <div className="mt-5">
          <label className="fw-medium text-secondary">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        <div>
          {/* Location tracker */}
          <LocationTracker
            onLocationChange={(location) => setLocation(location)}
          />
          <div className="mt-3 ms-3">
            <input
              placeholder="Copy your location here"
              className="border  p-3"
              value={savedlocation}
              onChange={({ target }) => setSavedlocation(target.value)}
            />
          </div>
        </div>
      </div>
      {/* Error message */}
      {error && <p className="text-danger mt-5 fs-6">{error}</p>}
      {/* Save button */}
      <button
        className="fw-medium btn btn-success mt-5 ms-3 px-4"
        onClick={handleAddJournal}
      >
        SAVE
      </button>
    </>
  );
};

export default AddEditNote;
