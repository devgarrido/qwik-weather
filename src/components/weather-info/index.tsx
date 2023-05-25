import {
  type Signal,
  component$,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import { getWeather } from "~/api/getWeather";
import { WeatherDataProps } from "~/types/types";

export const WeatherInfo = component$(({ city }: { city: Signal<string> }) => {
  const weatherData = useResource$<WeatherDataProps>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    return getWeather(city.value);
  });
  return (
    <Resource
      value={weatherData}
      onPending={() => <>Cargando....</>}
      onRejected={(err) => <>{err.message}</>}
      onResolved={(weatherData) => {
        return <div>Hola {weatherData.name}</div>;
      }}
    />
  );
});
