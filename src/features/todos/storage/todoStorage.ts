import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../shared/constants/storageKeys';
import { Todo } from '../model/types';

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'string' &&
    (typeof candidate.updatedAt === 'string' || candidate.updatedAt === null) &&
    (typeof candidate.completedAt === 'string' ||
      candidate.completedAt === null)
  );
}

export async function loadTodos(): Promise<Todo[]> {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.TODOS);

  if (!rawValue) {
    return [];
  }

  const parsed: unknown = JSON.parse(rawValue);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(isTodo);
}

export async function saveTodos(items: Todo[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(items));
}
