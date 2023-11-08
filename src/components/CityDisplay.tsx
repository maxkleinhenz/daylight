import { FaLocationArrow } from "react-icons/fa";
import { City } from "../hooks/usePosition";

type Props = {
  city?: City;
};

function CityDisplay({ city }: Props) {
  return (
    <div className="flex items-center gap-3 pt-3 font-semibold text-primary">
      <FaLocationArrow className="shrink-0 text-sm" />
      {!city && <p>Loading...</p>}
      {city?.error && <p>Error</p>}
      {city?.fullname && <p>{city?.fullname}</p>}
    </div>
  );
}
export default CityDisplay;
