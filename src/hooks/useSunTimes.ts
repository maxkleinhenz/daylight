import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import SunCalc from "suncalc";

export const useSunTimes = (
  now: Date,
  coords: GeolocationCoordinates | undefined
) => {
  const [sunTimes, setSunTimes] = useState<SunCalc.GetTimesResult>();
  const [sunPosition, setSunPosition] = useState<SunPostion>({
    isVisible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!coords) {
      setSunTimes(undefined);
      setSunPosition({
        isVisible: false,
        x: 0,
        y: 0,
      });
    } else {
      const sunTimes = SunCalc.getTimes(now, coords.latitude, coords.longitude);
      setSunTimes(sunTimes);

      const sunProgress =
        differenceInMinutes(now, sunTimes.sunrise) /
        differenceInMinutes(sunTimes.sunset, sunTimes.sunrise);

      const altitude = SunCalc.getPosition(
        now,
        coords.latitude,
        coords.longitude
      ).altitude;
      const posY = altitude / (Math.PI / 2);
      setSunPosition({
        isVisible:
          sunProgress >= 0 && sunProgress <= 1 && posY >= 0 && posY <= 1,
        x: sunProgress,
        y: posY,
      });
    }
  }, [coords]);

  return { sunTimes, sunPosition };
};

export type SunPostion = {
  isVisible: boolean;
  x: number;
  y: number;
};
