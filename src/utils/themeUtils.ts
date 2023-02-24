import { SunTimes } from "../hooks/useSunTimes";

const themeValues = ["sunrise", "daylight", "sunset", "twilight", "night"] as const;
export type Theme = (typeof themeValues)[number];

export function setTheme(now: Date, sunTime: SunTimes | undefined) {
  if (!sunTime) {
    document.documentElement.classList.value = "";
    return;
  }

  if (now >= sunTime.todayTimes.sunrise && now <= sunTime.todayTimes.sunriseEnd) {
    setThemeClass("sunrise");
  } else if (now >= sunTime.todayTimes.sunriseEnd && now <= sunTime.todayTimes.sunsetStart) {
    setThemeClass("daylight");
  } else if (now >= sunTime.todayTimes.sunsetStart && now <= sunTime.todayTimes.sunset) {
    setThemeClass("sunset");
  } else if (now >= sunTime.todayTimes.night || now <= sunTime.todayTimes.nightEnd) {
    setThemeClass("night");
  } else {
    setThemeClass("twilight");
  }
}

function setThemeClass(theme: Theme) {
  if (document.documentElement.classList.contains(theme)) return;
  document.documentElement.classList.value = theme;
}
