import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/pokemons/list-ssr/" class="mr-5">List-SSR</Link>
            <Link href="/pokemons/client-ssr/">List-Client</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
