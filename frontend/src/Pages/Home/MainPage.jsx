import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

import Navbar from "../../Components/Navbar";
import NoteCard from "../../Components/Cards/NoteCard";
import axiosInstance from "../../Components/Controller/axiosInstance";
import Modal from "react-modal";
import AddEditNote from "./AddEditNote";
import notelogo from "../../Assets/notelogo.jpg";

const MainPage = () => {
  const [allJournal, setAllJournal] = useState([]);
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Function to delete a note
  const handleDelete = async (_id) => {
    try {
      await axiosInstance.delete(`/api/journal/delete/${_id}`);
      // Remove the deleted note immediately
      setAllJournal((prevNotes) =>
        prevNotes.filter((note) => note._id !== _id)
      );
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };
  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("api/journal/");
      console.log("Response:", response.data);
      setAllJournal(response.data);
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  // Function to handle edit note
  const handleEdit = (journalDetails) => {
    setOpenAddEditModel({ isShown: true, data: journalDetails, type: "edit" });
  };

  const handleClose = () => {
    setOpenAddEditModel({ isShown: false, type: "add", data: null });
    getAllNotes();
  };
  //export pdf
  const handleExportPDF = async (_id) => {
    try {
      const response = await axiosInstance.get(
        `/api/journal/export/pdf/${_id}`,
        { responseType: "blob" }
      );
      saveAs(response.data, "journal.pdf");
    } catch (error) {
      console.error("Failed to export as PDF:", error);
    }
  };
  //export text file
  const handleExportText = async (_id) => {
    try {
      const response = await axiosInstance.get(
        `/api/journal/export/text/${_id}`,
        { responseType: "blob" }
      );
      saveAs(response.data, "journal.txt");
    } catch (error) {
      console.error("Failed to export as text:", error);
    }
  };
  return (
    <div className="vh-100 ">
      <div className="mb-4">
        <Navbar getAllNotes={getAllNotes} />
      </div>

      <div className="container mx-auto mt-3">
        <div className="row gap-2 mt-5">
          {allJournal.length === 0 ? (
            <div className="empty-card ">
              <img
                src={notelogo}
                alt="notelogo.jpg"
                className=" mt-5"
                style={{ width: "350px", height: "200px" }}
              />
              <p className="d-flex justify-content-center mt-1 fs-5">
                No Journal found. Start by creating your first journal entry!
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  // Open the modal for adding a new journal
                  setOpenAddEditModel({
                    isShown: true,
                    type: "add",
                    data: null,
                  })
                }
              >
                Create Journal Entry
              </button>
            </div>
          ) : (
            allJournal.map((item) => (
              <div className="mt-3">
                <NoteCard
                  key={item._id}
                  _id={item._id}
                  mood={item.mood}
                  title={item.title}
                  savedlocation={item.savedlocation}
                  content={item.content}
                  tags={item.tags}
                  date={item.date}
                  location={item.location}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item._id)}
                  onExportPDF={() => handleExportPDF(item._id)}
                  onExportText={() => handleExportText(item._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={handleClose}
        style={{
          overlay: {
            backgroundColor: "whitesmoke",
            marginTop: "28px",
            marginLeft: "6px",
          },
        }}
    
      >
        <AddEditNote
          type={openAddEditModel.type}
          onClose={handleClose}
          journalData={openAddEditModel.data}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default MainPage;
