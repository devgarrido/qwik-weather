import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./style.css?inline";
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <nav>
      <a href="/">
        Qwik <br />
        WEATHER
      </a>
    </nav>
  );
});
