import { Todo } from '../../features/todos/types';

export type TodoMetaLabelKey = 'created' | 'updated' | 'completed';

export function getTodoDisplayMeta(todo: Todo): {
  labelKey: TodoMetaLabelKey;
  date: string;
} {
  if (todo.completed && todo.completedAt) {
    return {
      labelKey: 'completed',
      date: todo.completedAt,
    };
  }

  if (todo.updatedAt) {
    return {
      labelKey: 'updated',
      date: todo.updatedAt,
    };
  }

  return {
    labelKey: 'created',
    date: todo.createdAt,
  };
}
