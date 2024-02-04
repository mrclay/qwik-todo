import {
  component$,
  useVisibleTask$
} from "@builder.io/qwik";
import type { DocumentHead } from '@builder.io/qwik-city';

const IndexPage = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    location.href = '/chord/';
  });

  return (
    <div />
  );
});

export default IndexPage;

export const head: DocumentHead = {
  title: 'mrclay.org',
  meta: [],
};
