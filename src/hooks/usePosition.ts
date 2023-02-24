import { useState, useEffect } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [city, setCity] = useState<City | undefined>(undefined);

  useEffect(() => {
    if ("geolocation" in navigator === false) {
      setCity({ error: { code: 2, message: "Location is not available" } });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => setPosition(pos),
      (error) => setCity({ error: { code: error.code, message: error.message } })
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    fetchCity(position.coords.latitude, position.coords.longitude)
      .then((city) => setCity(city))
      .catch(() => setCity({ error: { code: 2, message: "Could not fetch yout location" } }));
  }, [position]);

  return { position, city };
};

export type City = {
  name?: string;
  country?: string;
  fullname?: string;
  error?: GeoError;
};

export type GeoError = {
  code: number;
  message: string;
};

async function fetchCity(lat: number, lon: number): Promise<City | undefined> {
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
  } as City;
}
