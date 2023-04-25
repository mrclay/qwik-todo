export const allFilters = ["all", "active", "completed"] as const;

export interface Todo {
  id: string;
  label: string;
  completed: boolean;
}

export interface State {
  nextId: number;
  items: Todo[];
  filter: (typeof allFilters)[number];
}

export const initState: State = {
  nextId: 1,
  items: [],
  filter: "all",
};
