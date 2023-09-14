import {
  component$,
  useStore,
  useContextProvider,
  createContextId,
  useTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Header } from '~/components/header';
import { Main } from '~/components/main';
import { Footer } from '~/components/footer';
import { initState } from '~/state';
import type { State } from '~/state';

export const StateCtx = createContextId<State>('state-ctx');

const IndexPage = component$(() => {
  const store = useStore(initState);
  useContextProvider(StateCtx, store);

  useTask$(({ track }) => {
    track(() => store.items);
    console.log('items updated:', store.items);
  });

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
});

export default IndexPage;

export const head: DocumentHead = {
  title: 'TODO Application',
  meta: [],
};
