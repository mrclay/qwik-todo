import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { StateCtx } from '~/routes';

export const Header = component$(() => {
  const store = useContext(StateCtx);
  const label = useSignal('');

  useTask$(({ track }) => {
    const value = track(() => label.value);

    // TODO Why don't I get logs for every letter?
    console.log('label updated:', value);
  });

  return (
    <header>
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        value={label.value}
        onChange$={(_, currentTarget) => {
          label.value = currentTarget.value;
        }}
        onKeyUp$={(e) => {
          if (e.key === 'Enter') {
            const id = String(store.nextId++);
            store.items = [
              ...store.items,
              { label: label.value, id, completed: false },
            ];
            label.value = '';
          }
        }}
      />
    </header>
  );
});
