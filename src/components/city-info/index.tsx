import { type Signal, component$ } from "@builder.io/qwik";

export const CityInfo = component$(({ city }: { city: Signal<string> }) => {
  return <div>City info about {city.value}</div>;
});