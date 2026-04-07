import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoUpdatePayload, TodosState } from '../types';

const initialState: TodosState = {
  items: [],
  isLoading: true,
  isMutating: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },

    addTodo(state, action: PayloadAction<Todo>) {
      state.items.unshift(action.payload);
    },

    updateTodo(state, action: PayloadAction<TodoUpdatePayload>) {
      state.items = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item,
      );
    },

    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setMutating(state, action: PayloadAction<boolean>) {
      state.isMutating = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  hydrate,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setMutating,
  setError,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
