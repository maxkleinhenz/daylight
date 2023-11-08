import { differenceInMinutes } from "date-fns";
import { SunTimes } from "../hooks/useSunTimes";

export type Props = {
  now: Date;
  sunTimes?: SunTimes;
};

function getMessage(messageForTomorrow: boolean, minutes: number) {
  const messages = {
    today: {
      positive: {
        minutes: [
          <p>
            Today is{" "}
            <span className="font-semibold">
              {Math.abs(minutes)} {Math.abs(minutes) === 1 ? "minute" : "minutes"} longer
            </span>
            . Enjoy the day.
          </p>,
        ],
        seconds: [<p>Today is a little bit longer. Enjoy the day.</p>],
      },
      negative: {
        minutes: [
          <p>
            Unfortunately the day is {Math.abs(minutes)} {Math.abs(minutes) === 1 ? "minute" : "minutes"} shorter. It’ll get
            better!
          </p>,
        ],
        seconds: [<p>Unfortunately the day is a little bit shorter. It’ll get better!.</p>],
      },
    },
    tomorrow: {
      positive: {
        minutes: [
          <p>
            Have a good night's sleep. Tomorrow is{" "}
            <span className="font-semibold">
              {Math.abs(minutes)} {Math.abs(minutes) === 1 ? "minute" : "minutes"} longer
            </span>
            .
          </p>,
        ],
        seconds: [<p>Have a good night's sleep. Tomorrow is a little bit longer</p>],
      },
      negative: {
        minutes: [
          <p>
            Unfortunately tomorrow is {Math.abs(minutes)} {Math.abs(minutes) === 1 ? "minute" : "minutes"} shorter than today.
            It’ll get better!
          </p>,
        ],
        seconds: [<p>Unfortunately tomorrow is a little bit shorter. It’ll get better!.</p>],
      },
    },
  };

  const day = messageForTomorrow ? messages.tomorrow : messages.today;

  if (minutes >= 0) {
    return minutes >= 1 ? day.positive.minutes[0] : day.positive.seconds[0];
  } else {
    return minutes <= -1 ? day.negative.minutes[0] : day.negative.seconds[0];
  }
}

function DaylightChangeMessage({ now, sunTimes }: Props) {
  if (!sunTimes) return null;

  const todaySunlight = differenceInMinutes(sunTimes.todayTimes.sunset, sunTimes.todayTimes.sunrise);
  const yesterdaySunlight = differenceInMinutes(sunTimes.yesterdayTimes.sunset, sunTimes.yesterdayTimes.sunrise);
  const tomorrowSunlight = differenceInMinutes(sunTimes.tomorrowSunTimes.sunset, sunTimes.tomorrowSunTimes.sunrise);

  let minutes: number;
  let messageForTomorrow = false;
  if (now <= sunTimes.todayTimes.sunset) {
    minutes = todaySunlight - yesterdaySunlight;
    messageForTomorrow = false;
  } else {
    minutes = tomorrowSunlight - todaySunlight;
    messageForTomorrow = true;
  }

  const message = getMessage(messageForTomorrow, minutes);

  return <div className="py-4 text-3xl text-primary">{message}</div>;
}

export default DaylightChangeMessage;
