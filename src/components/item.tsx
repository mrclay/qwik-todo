import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { Todo } from "~/state";
import { StateCtx } from "~/routes";

interface ItemProps {
  todo: Todo;
}

export const Item = component$<ItemProps>(({ todo }) => {
  const store = useContext(StateCtx);
  const editing = useSignal(false);
  const editLabel = useSignal("");

  useVisibleTask$(({ track }) => {
    const isEditing = track(() => editing.value);

    if (isEditing) {
      const input = document.querySelector<HTMLInputElement>(
        `#TODO-edit-${todo.id}`
      );
      if (input) {
        input.select();
      }
    }
  });

  return (
    <li
      class={`${todo.completed ? "completed" : ""} ${
        editing.value ? "editing" : ""
      }`}
    >
      {editing.value ? (
        <input
          id={`TODO-edit-${todo.id}`}
          class="edit"
          type="text"
          value={editLabel.value}
          onChange$={(e) => {
            editLabel.value = e.target.value;
          }}
          onKeyUp$={(e) => {
            if (e.key === "Enter") {
              store.items = store.items.map(({ id, label, completed }) => ({
                id,
                label: id === todo.id ? editLabel.value : label,
                completed,
              }));
              editing.value = false;
            }
            if (e.key === "Escape") {
              editing.value = false;
            }
          }}
        />
      ) : (
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
            {todo.label}
          </label>
          <button
            type="button"
            class="destroy"
            onClick$={() => {
              store.items = store.items.filter((item) => item.id !== todo.id);
            }}
          />
        </div>
      )}
    </li>
  );
});
