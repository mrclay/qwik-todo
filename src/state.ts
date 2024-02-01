import type { QRL } from '@builder.io/qwik';
import { $ } from '@builder.io/qwik';

export const allFilters = ['all', 'active', 'completed'] as const;

export interface Todo {
  id: string;
  label: string;
  completed: boolean;
}

export interface State {
  nextId: number;
  items: Todo[];
  filter: (typeof allFilters)[number];

  // Actions
  toggle: QRL<(this: State, todo: Todo) => void>;
  destroy: QRL<(this: State, todo: Todo) => void>;
  setLabel: QRL<(this: State, todo: Todo, newLabel: string) => void>;
}

export const initState: State = {
  nextId: 1,
  items: [],
  filter: 'all',

  // Actions
  toggle: $(function (todo: Todo) {
    const el = this.items.find((el) => el === todo);
    if (el) {
      el.completed = !el.completed;
    }
  }),
  destroy: $(function (todo) {
    this.items = this.items.filter((item) => item !== todo);
  }),
  setLabel: $(function (todo, newLabel) {
    const el = this.items.find((el) => el === todo);
    if (el) {
      el.label = newLabel;
    }
  }),
};
