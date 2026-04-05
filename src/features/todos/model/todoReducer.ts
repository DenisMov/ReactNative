import { TodosAction, TodosState } from './types';

export const initialTodosState: TodosState = {
  items: [],
  isLoading: true,
  isMutating: false,
  error: null,
};

export function todoReducer(
  state: TodosState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case 'hydrate':
      // Replace state with persisted todos (initial load)
      return {
        ...state,
        items: action.payload,
      };

    case 'add':
      // Add new todo to the top of the list
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case 'update':
      // Update a single todo by id
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item,
        ),
      };

    case 'delete':
      // Remove todo by id
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'setLoading':
      // Used during initial data fetch
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'setMutating':
      // Used during async mutations (biometric actions)
      return {
        ...state,
        isMutating: action.payload,
      };

    case 'setError':
      // Store user-facing error message
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
