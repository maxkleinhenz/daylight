import { useState, useEffect, useRef } from "react";

export const usePosition = (enableWatch: boolean = false) => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeoError>();
  const [city, setCity] = useState<City>({ state: "Loading" });
  const geoWatch = useRef<number | undefined>(undefined);

  useEffect(() => {
    if ("geolocation" in navigator === false) {
      setError({ code: 2, message: "Location is not available" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => setPosition(pos),
      (error) => setError({ code: error.code, message: error.message })
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    fetchCity(position.coords.latitude, position.coords.longitude).then(
      (city) => setCity(city)
    );
  }, [position]);

  useEffect(() => {
    if (enableWatch && !geoWatch.current) {
      startWatch();
    } else if (!enableWatch && geoWatch.current) {
      stopWatch();
    }

    return () => stopWatch();
  }, [enableWatch]);

  function startWatch() {
    if ("geolocation" in navigator && !geoWatch.current)
      geoWatch.current = navigator.geolocation.watchPosition(
        (pos) => setPosition(pos),
        (err) => setError(error)
      );
  }

  function stopWatch() {
    if ("geolocation" in navigator && geoWatch.current)
      navigator.geolocation.clearWatch(geoWatch.current);
  }

  return { position, error, city };
};

export type City = {
  name?: string;
  country?: string;
  fullname?: string;
  state: "Loading" | "Ok" | "Error";
};

export type GeoError = {
  code: number;
  message: string;
};

async function fetchCity(lat: number, lon: number): Promise<City> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
    );
    const json = await response.json();
    const village = json.address.village as string | undefined;
    const town = json.address.town as string | undefined;
    const city = json.address.city as string | undefined;
    const municipality = json.address.municipality as string | undefined;
    const state = json.address.state as string | undefined;
    const country = json.address.country as string | undefined;

    const name = village ?? town ?? city ?? municipality ?? state;

    return {
      name: name,
      country: country,
      fullname: `${name}, ${country}`,
      state: "Ok",
    } as City;
  } catch (error) {
    console.log(error);
    return { state: "Error" };
  }
}
