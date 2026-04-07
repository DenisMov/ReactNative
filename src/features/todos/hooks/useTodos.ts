import { useCallback, useEffect } from 'react';
import { requireBiometricAuth } from '../../auth/services/localAuth';
import {
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  hydrate,
  setError,
  setLoading,
  setMutating,
  updateTodo as updateTodoAction,
} from '../model/todosSlice';
import { Todo } from '../types';
import { loadTodos, saveTodos } from '../storage/todoStorage';
import { getNowIso } from '../../../shared/utils/date';
import { generateId } from '../../../shared/utils/id';
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { useI18n } from '../../../shared/i18n/useI18n';

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
  const dispatch = useAppDispatch();
  const { t } = useI18n();

  const authAddPrompt = t('auth.add');
  const authUpdatePrompt = t('auth.update');
  const authDeletePrompt = t('auth.delete');

  const { items, isLoading, isMutating, error } = useAppSelector(
    state => state.todos,
  );

  const persistItems = useCallback(async (nextItems: Todo[]): Promise<void> => {
    await saveTodos(nextItems);
  }, []);

  const reload = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const storedItems = await loadTodos();
      dispatch(hydrate(storedItems));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, 'errors.loadTodos')));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const runProtectedAction = useCallback(
    async (
      promptMessage: string,
      action: () => Promise<void>,
    ): Promise<boolean> => {
      dispatch(setError(null));
      dispatch(setMutating(true));

      try {
        const authResult = await requireBiometricAuth(promptMessage);

        if (!authResult.success) {
          dispatch(setError(authResult.message));
          return false;
        }

        await action();
        return true;
      } catch (error) {
        dispatch(setError(getErrorMessage(error, 'errors.updateTodos')));
        return false;
      } finally {
        dispatch(setMutating(false));
      }
    },
    [dispatch],
  );

  const addTodo = useCallback(
    async (title: string): Promise<boolean> => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        dispatch(setError('errors.emptyTitle'));
        return false;
      }

      return runProtectedAction(authAddPrompt, async () => {
        const now = getNowIso();

        const newTodo: Todo = {
          id: generateId(),
          title: trimmedTitle,
          completed: false,
          createdAt: now,
          updatedAt: null,
          completedAt: null,
        };

        const nextItems = [newTodo, ...items];

        await persistItems(nextItems);
        dispatch(addTodoAction(newTodo));
      });
    },
    [dispatch, items, persistItems, runProtectedAction, authAddPrompt],
  );

  const updateTodo = useCallback(
    async (id: string, title: string): Promise<boolean> => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        dispatch(setError('errors.emptyTitle'));
        return false;
      }

      const existingTodo = items.find(item => item.id === id);

      if (!existingTodo) {
        dispatch(setError('errors.notFound'));
        return false;
      }

      return runProtectedAction(authUpdatePrompt, async () => {
        const updates = {
          title: trimmedTitle,
          updatedAt: getNowIso(),
        };

        const nextItems = items.map(item =>
          item.id === id ? { ...item, ...updates } : item,
        );

        await persistItems(nextItems);
        dispatch(updateTodoAction({ id, updates }));
      });
    },
    [dispatch, items, persistItems, runProtectedAction, authUpdatePrompt],
  );

  const toggleTodo = useCallback(
    async (id: string): Promise<boolean> => {
      const existingTodo = items.find(item => item.id === id);

      if (!existingTodo) {
        dispatch(setError('errors.notFound'));
        return false;
      }

      return runProtectedAction(authUpdatePrompt, async () => {
        const now = getNowIso();
        const isCompleting = !existingTodo.completed;

        const updates = {
          completed: isCompleting,
          updatedAt: now,
          completedAt: isCompleting ? now : null,
        };

        const nextItems = items.map(item =>
          item.id === id ? { ...item, ...updates } : item,
        );

        await persistItems(nextItems);
        dispatch(updateTodoAction({ id, updates }));
      });
    },
    [dispatch, items, persistItems, runProtectedAction, authUpdatePrompt],
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<boolean> => {
      const exists = items.some(item => item.id === id);

      if (!exists) {
        dispatch(setError('errors.notFound'));
        return false;
      }

      return runProtectedAction(authDeletePrompt, async () => {
        const nextItems = items.filter(item => item.id !== id);

        await persistItems(nextItems);
        dispatch(deleteTodoAction({ id }));
      });
    },
    [dispatch, items, persistItems, runProtectedAction, authDeletePrompt],
  );

  const clearError = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  return {
    items,
    isLoading,
    isMutating,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    reload,
  };
}
