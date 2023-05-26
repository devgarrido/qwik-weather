import type { WeatherDataProps } from "~/types/types";

export async function getWeather(cityName: string): Promise<WeatherDataProps> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_KEY_OPENWEATHER}&units=metric`;
    const resp = await fetch(url);
    const json = await resp.json();
    return json;

}