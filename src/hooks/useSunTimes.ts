import { addDays, differenceInMinutes, subDays } from "date-fns";
import { useEffect, useState } from "react";
import SunCalc from "suncalc";

export const useSunTimes = (now: Date, coords: GeolocationCoordinates | undefined) => {
  const [sunTimes, setSunTimes] = useState<SunTimes>();
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
      const todaySunTimes = SunCalc.getTimes(now, coords.latitude, coords.longitude);
      const yesterdaySunTimes = SunCalc.getTimes(subDays(now, 1), coords.latitude, coords.longitude);
      const tomorrowSunTimes = SunCalc.getTimes(addDays(now, 1), coords.latitude, coords.longitude);
      setSunTimes({
        todayTimes: todaySunTimes,
        yesterdayTimes: yesterdaySunTimes,
        tomorrowSunTimes: tomorrowSunTimes,
      });

      const sunProgress =
        differenceInMinutes(now, todaySunTimes.sunrise) /
        differenceInMinutes(todaySunTimes.sunset, todaySunTimes.sunrise);

      const altitude = SunCalc.getPosition(now, coords.latitude, coords.longitude).altitude;
      const posY = altitude / (Math.PI / 2);
      setSunPosition({
        isVisible: sunProgress >= 0 && sunProgress <= 1,
        x: sunProgress,
        y: posY,
      });
    }
  }, [coords]);

  return { sunTimes, sunPosition };
};

export type SunTimes = {
  todayTimes: SunCalc.GetTimesResult;
  yesterdayTimes: SunCalc.GetTimesResult;
  tomorrowSunTimes: SunCalc.GetTimesResult;
};

export type SunPostion = {
  isVisible: boolean;
  x: number;
  y: number;
};
