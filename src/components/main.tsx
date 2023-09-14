import { component$, useContext } from '@builder.io/qwik';
import { Item } from '~/components/item';
import { StateCtx } from '~/routes';

export const Main = component$(() => {
  const store = useContext(StateCtx);

  return (
    <section class="main">
      <ul class="todo-list">
        {store.items
          .filter((item) => {
            if (store.filter === 'all') {
              return true;
            }
            return store.filter === 'completed'
              ? item.completed
              : !item.completed;
          })
          .map((item) => (
            <Item key={item.id} todo={item} />
          ))}
      </ul>
    </section>
  );
});
