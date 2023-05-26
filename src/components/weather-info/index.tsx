import {
  type Signal,
  component$,
  useResource$,
  Resource,
  useSignal,
  $,
} from "@builder.io/qwik";
import { getWeather } from "~/api/getWeather";
import type { WeatherDataProps } from "~/types/types";
import { WiSwitcher } from "../icons/wi-switcher";

export const WeatherInfo = component$(({ city }: { city: Signal<string> }) => {
  const newCity = useSignal("");
  const weatherData = useResource$<WeatherDataProps>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    return getWeather(city.value);
  });

  const handleSearch = $(() => {
    city.value = newCity.value;
  });

  return (
    <Resource
      value={weatherData}
      onPending={() => <>Cargando....</>}
      onRejected={(err) => <>{err.message}</>}
      onResolved={(weatherData) => {
        return (
          <div class="weather">
            <div class="weather__current">
              <div class="weather__current_temperature">
                {Math.round(weatherData.main.temp)}ºC
              </div>
              <WiSwitcher code={weatherData.weather[0].icon} />
              <dir>{weatherData.weather[0].description}</dir>
            </div>
            <div class="weather__search">
              <input
                onInput$={(event) =>
                  (newCity.value = (event.target as HTMLInputElement).value)
                }
                type="text"
                name="city"
                id="city"
                placeholder={city.value}
                value={newCity.value}
              />
              <button onClick$={() => handleSearch()} class="btn">
                Search
              </button>
            </div>
            <div class="weather__extra">
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Feels Like</div>
                <div class="weather__extra__detail__value">
                  {Math.round(weatherData.main.feels_like)}
                </div>
              </div>
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Humidity</div>
                <div class="weather__extra__detail__value">
                  {Math.round(weatherData.main.humidity)}%
                </div>
              </div>
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Wind</div>
                <div class="weather__extra__detail__value">
                  {Math.round(weatherData.wind.speed)} Km/hr
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
});
