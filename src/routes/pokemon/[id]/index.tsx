import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-img";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) throw redirect(301, '/');
  if (id <= 0 || id > 1302) throw redirect(301, '/');
  return id;
});

export default component$(() => {
  // const location = useLocation();
  const pokemonId = usePokemonId();

  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} size={200} reveal={false} />
    </>
  );
});
