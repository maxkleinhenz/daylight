import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { GeoError } from "../hooks/usePosition";

export type Props = {
  error?: GeoError;
};

function GeolocationErrorAlert({ error }: Props) {
  if (!error) return null;

  let title = "";
  let text = "";

  if (error.code === 1) {
    title = "Please enable location access";
    text = "On order to see your daylight information, please enable location access for this website";
  } else {
    title = "Your location could not be retrieved";
    text = "Something went wrong while retrieving your location information. Please try again.";
  }

  return (
    <div
      className="absolute top-12 z-10 mb-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <FaInfoCircle />
      <span className="sr-only">Info</span>
      <div>
        <p className="font-medium">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default GeolocationErrorAlert;
