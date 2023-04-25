import { component$, useContext } from "@builder.io/qwik";
import { StateCtx } from "~/routes";
import { allFilters } from "~/state";

export const Footer = component$(() => {
  const store = useContext(StateCtx);

  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>{store.items.filter((el) => !el.completed).length}</strong>{" "}
        items left
      </span>
      <ul class="filters">
        {allFilters.map((val) => (
          <li key={val}>
            <a
              class={val === store.filter ? "selected" : ""}
              onClick$={() => {
                store.filter = val;
              }}
            >
              {val.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
      <button
        class="clear-completed"
        onClick$={() => {
          store.items = store.items.filter((item) => !item.completed);
        }}
      >
        Clear completed
      </button>
    </footer>
  );
});
