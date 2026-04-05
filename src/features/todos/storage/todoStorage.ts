import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../shared/constants/storageKeys';
import { Todo } from '../model/types';

/**
 * Runtime type guard to validate unknown data from storage.
 * Ensures that parsed JSON matches the Todo shape.
 */
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

/**
 * Loads todos from AsyncStorage.
 * Includes validation to avoid crashes from corrupted or invalid data.
 */
export async function loadTodos(): Promise<Todo[]> {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.TODOS);

  if (!rawValue) {
    return [];
  }

  const parsed: unknown = JSON.parse(rawValue);

  if (!Array.isArray(parsed)) {
    return [];
  }

  // Filter only valid Todo objects
  return parsed.filter(isTodo);
}

/**
 * Persists todos to AsyncStorage.
 */
export async function saveTodos(items: Todo[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(items));
}
