import { $, component$, useSignal } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-img";

export default component$(() => {
  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const reveal = useSignal(true);

  const changePokemonId = $((value: number) => {
    function getRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    pokemonId.value = getRandomNumber(1, 1302);
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-7xl">{pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        size={200}
        backImage={showBackImage.value}
        reveal={reveal.value}
      />

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>

        <button
          class="btn btn-primary ml-2"
          onClick$={() => (showBackImage.value = !showBackImage.value)}
        >
          Voltear
        </button>
        <button
          class="btn btn-primary ml-2"
          onClick$={() => (reveal.value = !reveal.value)}
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "chota",
      content: "Qwik",
    },
  ],
};
