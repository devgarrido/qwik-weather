import {
  type Signal,
  component$,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import { getCityImage } from "~/api/getCityImage";
import type { CityProps } from "~/types/types";

export const CityInfo = component$(({ city }: { city: Signal<string> }) => {
  const cityImageData = useResource$<CityProps>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    return getCityImage(city.value);
  });
  return (
    <Resource
      value={cityImageData}
      onPending={() => <p>Cargando...</p>}
      onRejected={(error: Error) => <p>Error:{error.message}</p>}
      onResolved={(cityImageData: CityProps) => {
        return (
          <figure>
            <picture>
              <img
                src={cityImageData.urls.raw}
                alt={cityImageData.alt_description}
                class="weather__city"
              />
            </picture>
            <figcaption>
              Copyright from{" "}
              <a
                target="_blank"
                rel="nofollow noopener"
                href={cityImageData.user.social.portfolio_url}
              >
                {cityImageData.user.username}
              </a>
            </figcaption>
          </figure>
        );
      }}
    />
  );
});
