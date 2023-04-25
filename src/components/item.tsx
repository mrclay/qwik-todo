import { component$, useContext, useSignal } from "@builder.io/qwik";
import type { Todo } from "~/state";
import { StateCtx } from "~/routes";

interface ItemProps {
  todo: Todo;
}

export const Item = component$<ItemProps>(({ todo }) => {
  const store = useContext(StateCtx);
  const editing = useSignal(false);
  const editLabel = useSignal("");

  return (
    <li
      class={`${todo.completed ? "completed" : ""} ${
        editing.value ? "editing" : ""
      }`}
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          onClick$={() => {
            store.items = store.items.map(({ id, label, completed }) => ({
              id,
              label,
              completed: id === todo.id ? !completed : completed,
            }));
          }}
          checked={todo.completed}
        />
        <label
          onDblClick$={() => {
            editLabel.value = todo.label;
            editing.value = true;
          }}
        >
          {editing.value && (
            // TODO Why does this disappear?
            <input
              class="edit"
              type="text"
              value={editLabel.value}
              onChange$={(e) => {
                editLabel.value = e.target.value;
              }}
              onKeyUp$={(e) => {
                if (e.key === "Enter") {
                  store.items = store.items.map(({ id, completed }) => ({
                    id,
                    label: editLabel.value,
                    completed,
                  }));
                  editing.value = false;
                }
              }}
            />
          )}
          {!editing.value && <span>{todo.label}</span>}
        </label>
        <button
          type="button"
          class="destroy"
          onClick$={() => {
            store.items = store.items.filter((item) => item.id !== todo.id);
          }}
        />
      </div>
    </li>
  );
});
