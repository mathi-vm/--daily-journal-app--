import React, { useState } from "react";
import axiosInstance from "../Controller/axiosInstance";
import { API_KEY } from "../Controller/constants";
const LocationTracker = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    details: null,
    error: null,
  });

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      //getcurrentposition
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axiosInstance.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            );
            if (response.data.results.length > 0) {
              const locationDetails = response.data.results[0].formatted;
              setLocation({
                latitude,
                longitude,
                details: locationDetails,
                error: null,
              });
            } else {
              setLocation({
                ...location,
                error: "No address found for the given coordinates",
              });
            }
          } catch (error) {
            setLocation({
              ...location,
              error: "Failed to retrieve location details",
            });
          }
        },
        (error) => {
          setLocation({ ...location, error: error.message });
        }
      );
    } else {
      setLocation({
        ...location,
        error: "Geolocation is not supported by this browser.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-success mb-3" onClick={handleGetLocation}>
        Get Location
      </button>
      {location.details && (
        <div className="card ">
          <div className="card-body">
            <p className="card-text">Location Details:{location.details}</p>
          </div>
        </div>
      )}
      {location.error && (
        <div className="alert alert-danger mt-3" role="alert">
          Error: {location.error}
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
