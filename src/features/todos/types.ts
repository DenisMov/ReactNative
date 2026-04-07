export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
  completedAt: string | null;
};

export type TodosState = {
  items: Todo[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
};

export type TodoUpdatePayload = {
  id: string;
  updates: Partial<
    Pick<Todo, 'title' | 'completed' | 'updatedAt' | 'completedAt'>
  >;
};
