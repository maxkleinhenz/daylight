import React from "react";
import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { City } from "../hooks/usePosition";

type Props = {
  city: City;
};

function CityDisplay({ city }: Props) {
  return (
    <div className="flex items-center gap-3 px-2 pt-3 font-semibold text-darker">
      <FaLocationArrow className="text-sm" />
      {city.state == "Ok" && <p>{city?.fullname}</p>}
      {city.state == "Loading" && <>Loading</>}
      {city.state == "Error" && <>Error</>}
    </div>
  );
}
export default CityDisplay;
