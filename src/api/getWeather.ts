import type { WeatherDataProps } from "~/types/types";

export async function getWeather(cityeName: string): Promise<WeatherDataProps> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityeName}&appid=${import.meta.env.VITE_KEY_OPENWEATHER}&units=metrics`;
    const resp = await fetch(url);
    const json = await resp.json();
    return json;

}