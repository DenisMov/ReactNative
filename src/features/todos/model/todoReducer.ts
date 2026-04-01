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
      return {
        ...state,
        items: action.payload,
      };

    case 'add':
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case 'update':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item,
        ),
      };

    case 'delete':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'setMutating':
      return {
        ...state,
        isMutating: action.payload,
      };

    case 'setError':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
