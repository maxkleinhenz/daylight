import CityDisplay from "./components/CityDisplay";
import GeolocationErrorAlert from "./components/GeolocationErrorAlert";
import { usePosition } from "./hooks/usePosition";
import { useSunTimes } from "./hooks/useSunTimes";

function App() {
  const now = new Date();

  const { position, error, city } = usePosition();
  const { sunTimes, sunPosition } = useSunTimes(now, position?.coords);

  return (
    <div className="h-full flex-col items-center">
      <GeolocationErrorAlert error={error} />

      <div className="mx-auto flex h-full w-full max-w-[700px] flex-col justify-end px-8 py-8">
        <div className="relative max-h-[600px] w-full flex-1 border-b-2 border-darker">
          {sunPosition.isVisible && (
            <div
              className="absolute h-4 w-4 rounded-full bg-darker"
              style={{
                left: `${sunPosition.x * 100}%`,
                bottom: `${sunPosition.y * 100}%`,
              }}
            ></div>
          )}
        </div>
        <div className="w-full flex-col items-center px-2 py-1">
          <div className="flex w-full justify-between text-sm font-semibold text-darker">
            {sunTimes ? (
              <>
                <div>
                  {sunTimes?.sunrise.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  {sunTimes?.sunset.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
        <CityDisplay city={city} />
      </div>
    </div>
  );
}

export default App;
