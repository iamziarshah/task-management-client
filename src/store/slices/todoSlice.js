import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, text: "Learn Redux", completed: false },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Learn Redux", completed: false },
    { id: 4, text: "Learn Redux", completed: false },
    { id: 5, text: "Learn Redux", completed: false },
    { id: 6, text: "Learn Redux", completed: false },
  ],
  filter: "ALL", // ALL | COMPLETED | PENDING
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      console.log(state);
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      };

      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
