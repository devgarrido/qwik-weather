import { type CityProps } from "~/types/types";

export async function getCityImage(cityName: string): Promise<CityProps> { 

    try {

        const url = `https://api.unsplash.com/photos/random?query=${cityName}&orientation=landscape&client_id=${
            import.meta.env.VITE_KEY_UNSPLAH
          }`;

        // const url = `https://api.unsplash.com/search/photos/random?query=${cityName}&client_id=${import.meta.env.VITE_KEY_UNSPLAH}`;
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
        
    } catch (error) {
        console.error('Error:', error);
        throw new Error;    
    }

}