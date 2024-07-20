import React from "react";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { getIntials } from "../../Components/Controller/Helper";
const ProfileCard = ({ userInfo }) => {
  return (
    <div>
      <div class="dropdown container-fixed">
        <div
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ border: "none" }}
        >
          <RiAccountCircleFill size={40} />
        </div>
        <ul class="dropdown-menu mt-2  ">
          <li>
            <p
              class="dropdown-item rounded-5 ms-5 mt-2 fs-3 fst-italic shadow-lg"
              style={{
                border: "1px",
                backgroundColor: "gray",
                color: "black",
                width: "3.7rem",
                padding: "9px",
                height: "3.7rem",
                textAlign: "center",
              }}
            >
              {getIntials(userInfo?.name)}
            </p>
          </li>
          <li>
            <p class=" fw-bold " style={{ textAlign: "center" }}>
              {userInfo?.name}
            </p>
          </li>
          <hr />
          <li>
            <Link to="/Login" className="fst-italic text-decoration-none">
              <button
                class=" ms-5  link-primary fw-bold bg-white"
                style={{ border: "none" }}
              >
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
