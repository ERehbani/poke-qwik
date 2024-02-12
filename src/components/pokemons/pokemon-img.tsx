import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size: number;
  backImage: boolean;
  reveal: boolean;
}

export const PokemonImage = component$(
  ({ id, size, backImage, reveal }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = backImage
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div class="flex items-center justify-center">
        {!imageLoaded.value && (
          <span class="flex h-[200px] w-[200px] items-center justify-center">
            Loading...
          </span>
        )}

        <img
          src={imageUrl}
          alt="Pokemon"
          width={`${size}`}
          height="200"
          onLoad$={() => {
            setTimeout(() => {
              imageLoaded.value = true;
            }, 0);
          }}
          class={[
            { hidden: !imageLoaded.value, "brightness-0": reveal },
            "transition-all",
          ]}
        />
      </div>
    );
  },
);
