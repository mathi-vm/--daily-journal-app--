import React, { useState, useEffect } from "react";
import ProfileCard from "./Cards/ProfileCard";
import assets from "../Assets/logohome.png";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddEditNote from "../Pages/Home/AddEditNote";
import axiosInstance from "../Components/Controller/axiosInstance";

const Navbar = ({ getAllNotes }) => {
  const navigate = useNavigate;

  // State to manage the type of modal
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState();

  // Function to fetch user information from API
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/journal/getuser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("api/users/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);
  return (
    <>
      <div
        className="  mb-5 container-fixed shadow-lg  opacity-75% gap-5 bg-white  px-1 fixed-top "
        style={{ backgroundColor: "white" }}
      >
        <div className="mt-2  d-flex flex-row justify-content-between   ">
          <div className="mt-0 ms-1">
            <img src={assets} alt="homelogo.jpg" style={{ width: "40px" }} />
          </div>

          <div className="d-flex gap-2  flex-row">
            <button
              className="border-0"
              style={{ background: "none" }}
              onClick={() => {
                setOpenAddEditModel({ isShown: true, type: "add", date: null });
              }}
            >
              <CiSquarePlus size={35} className="text-dark mt-1 mb-2" />
            </button>

            <Modal
              isOpen={openAddEditModel.isShown}
              onRequestClose={() => {
                // Close the modal
                setOpenAddEditModel({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              style={{
                overlay: {
                  backgroundColor: "whitesmoke",
                  marginTop: "28px",
                  marginLeft: "6px",
                },
              }}
              contentLabel=""
              className=""
            >
              <AddEditNote
                type={openAddEditModel.type}
                onClose={() => {
                  // Close the modal
                  setOpenAddEditModel({
                    isShown: false,
                    type: "add",
                    data: null,
                  });
                }}
                journalData={openAddEditModel.data}
                getAllNotes={getAllNotes}
              />
            </Modal>

            <ProfileCard className="mt-2" userInfo={userInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
