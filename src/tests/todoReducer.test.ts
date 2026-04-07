import {
  initialTodosState,
  todoReducer,
} from '../features/todos/model/todoReducer';
import { Todo } from '../features/todos/types';

const baseTodo: Todo = {
  id: '1',
  title: 'Write tests',
  completed: false,
  createdAt: '2026-04-01T10:00:00.000Z',
  updatedAt: '2026-04-01T10:00:00.000Z',
  completedAt: null,
};

describe('todoReducer', () => {
  it('hydrates items', () => {
    const nextState = todoReducer(initialTodosState, {
      type: 'hydrate',
      payload: [baseTodo],
    });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(baseTodo);
  });

  it('adds a new todo', () => {
    const nextState = todoReducer(initialTodosState, {
      type: 'add',
      payload: baseTodo,
    });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].title).toBe('Write tests');
  });

  it('updates an existing todo', () => {
    const state = {
      ...initialTodosState,
      items: [baseTodo],
    };

    const nextState = todoReducer(state, {
      type: 'update',
      payload: {
        id: '1',
        updates: {
          title: 'Write better tests',
          completed: true,
          updatedAt: '2026-04-01T11:00:00.000Z',
        },
      },
    });

    expect(nextState.items[0].title).toBe('Write better tests');
    expect(nextState.items[0].completed).toBe(true);
    expect(nextState.items[0].updatedAt).toBe('2026-04-01T11:00:00.000Z');
  });

  it('deletes a todo', () => {
    const state = {
      ...initialTodosState,
      items: [baseTodo],
    };

    const nextState = todoReducer(state, {
      type: 'delete',
      payload: { id: '1' },
    });

    expect(nextState.items).toHaveLength(0);
  });
});
