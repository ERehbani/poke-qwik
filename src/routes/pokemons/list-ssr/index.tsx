import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import type { BasicPokemonInfo, PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");
    if (offset < 0) redirect(301, pathname);
    // No redirecciona correctamente

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`,
    );
    const data = (await response.json()) as PokemonListResponse;
    return data.results;
  },
);

export default component$(() => {
  const pokemons = usePokemonList();

  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset')
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get("offset"));
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="my-5">Current offset: {currentOffset}</span>
        <span class="my-5">Is loading page</span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="mt-5 grid grid-cols-6">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col items-center justify-center"
          >
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List-SSR",
  meta: [
    {
      name: "chota",
      content: "Qwik",
    },
  ],
};
