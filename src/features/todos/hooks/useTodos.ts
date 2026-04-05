import { useCallback, useEffect, useReducer } from 'react';
import { requireBiometricAuth } from '../../auth/services/localAuth';
import { todoReducer, initialTodosState } from '../model/todoReducer';
import { Todo, TodosAction } from '../model/types';
import { loadTodos, saveTodos } from '../storage/todoStorage';
import { getNowIso } from '../../../shared/utils/date';
import { generateId } from '../../../shared/utils/id';

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

export type UseTodosResult = {
  items: Todo[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<boolean>;
  updateTodo: (id: string, title: string) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  clearError: () => void;
  reload: () => Promise<void>;
};

export function useTodos(): UseTodosResult {
  const [state, dispatch] = useReducer(todoReducer, initialTodosState);

  const persistAndDispatch = useCallback(
    async (nextItems: Todo[], action: TodosAction): Promise<void> => {
      await saveTodos(nextItems);
      dispatch(action);
    },
    [],
  );

  const reload = useCallback(async (): Promise<void> => {
    dispatch({ type: 'setLoading', payload: true });
    dispatch({ type: 'setError', payload: null });

    try {
      const items = await loadTodos();
      dispatch({ type: 'hydrate', payload: items });
    } catch (error) {
      dispatch({
        type: 'setError',
        payload: getErrorMessage(error, 'Failed to load saved tasks.'),
      });
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const runProtectedAction = useCallback(
    async (
      promptMessage: string,
      action: () => Promise<void>,
    ): Promise<boolean> => {
      dispatch({ type: 'setError', payload: null });
      dispatch({ type: 'setMutating', payload: true });

      try {
        const authResult = await requireBiometricAuth(promptMessage);

        if (!authResult.success) {
          dispatch({ type: 'setError', payload: authResult.message });
          return false;
        }

        await action();
        return true;
      } catch (error) {
        dispatch({
          type: 'setError',
          payload: getErrorMessage(error, 'Failed to update tasks.'),
        });
        return false;
      } finally {
        dispatch({ type: 'setMutating', payload: false });
      }
    },
    [],
  );

  const addTodo = useCallback(
    async (title: string): Promise<boolean> => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        dispatch({ type: 'setError', payload: 'Title cannot be empty.' });
        return false;
      }

      return runProtectedAction('Authenticate to add a task', async () => {
        const now = getNowIso();

        const newTodo: Todo = {
          id: generateId(),
          title: trimmedTitle,
          completed: false,
          createdAt: now,
          updatedAt: null,
          completedAt: null,
        };

        const nextItems = [newTodo, ...state.items];

        await persistAndDispatch(nextItems, {
          type: 'add',
          payload: newTodo,
        });
      });
    },
    [persistAndDispatch, runProtectedAction, state.items],
  );

  const updateTodo = useCallback(
    async (id: string, title: string): Promise<boolean> => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        dispatch({ type: 'setError', payload: 'Title cannot be empty.' });
        return false;
      }

      const existingTodo = state.items.find(item => item.id === id);

      if (!existingTodo) {
        dispatch({ type: 'setError', payload: 'Task was not found.' });
        return false;
      }

      return runProtectedAction('Authenticate to update a task', async () => {
        const updates = {
          title: trimmedTitle,
          updatedAt: getNowIso(),
        };

        const nextItems = state.items.map(item =>
          item.id === id ? { ...item, ...updates } : item,
        );

        await persistAndDispatch(nextItems, {
          type: 'update',
          payload: {
            id,
            updates,
          },
        });
      });
    },
    [persistAndDispatch, runProtectedAction, state.items],
  );

  const toggleTodo = useCallback(
    async (id: string): Promise<boolean> => {
      const existingTodo = state.items.find(item => item.id === id);

      if (!existingTodo) {
        dispatch({ type: 'setError', payload: 'Task was not found.' });
        return false;
      }

      return runProtectedAction('Authenticate to update a task', async () => {
        const now = getNowIso();
        const isCompleting = !existingTodo.completed;
        const updates = {
          completed: isCompleting,
          updatedAt: getNowIso(),
          completedAt: isCompleting ? now : null,
        };

        const nextItems = state.items.map(item =>
          item.id === id ? { ...item, ...updates } : item,
        );

        await persistAndDispatch(nextItems, {
          type: 'update',
          payload: {
            id,
            updates,
          },
        });
      });
    },
    [persistAndDispatch, runProtectedAction, state.items],
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<boolean> => {
      const exists = state.items.some(item => item.id === id);

      if (!exists) {
        dispatch({ type: 'setError', payload: 'Task was not found.' });
        return false;
      }

      return runProtectedAction('Authenticate to delete a task', async () => {
        const nextItems = state.items.filter(item => item.id !== id);

        await persistAndDispatch(nextItems, {
          type: 'delete',
          payload: { id },
        });
      });
    },
    [persistAndDispatch, runProtectedAction, state.items],
  );

  const clearError = useCallback(() => {
    dispatch({ type: 'setError', payload: null });
  }, []);

  return {
    items: state.items,
    isLoading: state.isLoading,
    isMutating: state.isMutating,
    error: state.error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    reload,
  };
}
