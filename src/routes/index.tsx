import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Weather App",
  meta: [
    {
      name: "description",
      content: "Descubre el tiempo de cualquier ciudad con esta aplicación",
    },
  ],
};
