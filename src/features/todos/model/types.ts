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
  updates: Partial<Pick<Todo, 'title' | 'completed' | 'updatedAt'>>;
};

export type TodosAction =
  | { type: 'hydrate'; payload: Todo[] }
  | { type: 'add'; payload: Todo }
  | { type: 'update'; payload: TodoUpdatePayload }
  | { type: 'delete'; payload: { id: string } }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setMutating'; payload: boolean }
  | { type: 'setError'; payload: string | null };
