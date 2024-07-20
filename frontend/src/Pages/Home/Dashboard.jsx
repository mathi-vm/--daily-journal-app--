import React from "react";
import { Link } from "react-router-dom";
import assets from "../../Assets/logohome.png";

const Dashboard = () => {
  return (
    <div
      className=" bg-success container-fixed d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div>
        <img
          src={assets}
          alt="homelogo.jpg"
          className=""
          style={{ width: "100px" }}
        />

        <p>
          <Link to="/Login" className=" display-6 text-white">
            Save Your Memories Here...
          </Link>
        </p>
      </div>
    </div>
  );
};



export default Dashboard;
