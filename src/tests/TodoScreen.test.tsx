import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { TodoScreen } from '../features/todos/ui/TodoScreen/TodoScreen';
import { useTodos, UseTodosResult } from '../features/todos/hooks/useTodos';
import { renderWithProviders } from './testUtils';

jest.mock('../features/todos/hooks/useTodos');

const mockedUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

function createUseTodosState(
  overrides: Partial<UseTodosResult> = {},
): UseTodosResult {
  return {
    items: [],
    isLoading: false,
    isMutating: false,
    error: null,
    addTodo: jest.fn().mockResolvedValue(true),
    updateTodo: jest.fn().mockResolvedValue(true),
    toggleTodo: jest.fn().mockResolvedValue(true),
    deleteTodo: jest.fn().mockResolvedValue(true),
    clearError: jest.fn(),
    reload: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('TodoScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state', () => {
    mockedUseTodos.mockReturnValue(createUseTodosState());

    const { getByText } = renderWithProviders(<TodoScreen />);

    expect(getByText('No tasks yet')).toBeTruthy();
    expect(
      getByText('Add your first secured TODO using the form above.'),
    ).toBeTruthy();
  });

  it('calls addTodo when form is submitted', async () => {
    const addTodo = jest.fn().mockResolvedValue(true);

    mockedUseTodos.mockReturnValue(
      createUseTodosState({
        addTodo,
      }),
    );

    const { getByTestId } = renderWithProviders(<TodoScreen />);

    fireEvent.changeText(getByTestId('todo-form-input'), 'Buy milk');
    fireEvent.press(getByTestId('todo-form-submit'));

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith('Buy milk');
    });
  });

  it('calls deleteTodo when delete button is pressed', async () => {
    const deleteTodo = jest.fn().mockResolvedValue(true);

    mockedUseTodos.mockReturnValue(
      createUseTodosState({
        items: [
          {
            id: '1',
            title: 'Read a book',
            completed: false,
            createdAt: '2026-04-01T10:00:00.000Z',
            updatedAt: '2026-04-01T10:00:00.000Z',
            completedAt: null,
          },
        ],
        deleteTodo,
      }),
    );

    const { getByTestId } = renderWithProviders(<TodoScreen />);

    fireEvent.press(getByTestId('todo-delete-1'));

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith('1');
    });
  });
});
