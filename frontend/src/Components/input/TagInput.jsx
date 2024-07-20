import React, { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";

const TagInput = ({ tags, setTags }) => {
  // State to manage the current value of the input field
  const [inputValue, setInputValue] = useState(" ");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  //Function to add a new tag
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Add tag when Enter key is pressed
      addNewTag();
    }
  };
  // Function to remove a specific tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className="">
          {tags.map((tag, index) => (
            <span key={index} className="">
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <IoMdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Input field and button for adding new tags */}
      <div className="d-flex align-item-center gap-2 mt-3">
        <input
          type="text"
          className="p-1 border-1 shadow mt-1 fs-6 text-secondary"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="border-0 btn btn-outline-success"
          onClick={() => {
            addNewTag();
          }}
        >
          <IoMdAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
