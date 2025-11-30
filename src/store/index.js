import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filtersReducer from "./slices/filtersSlice";
import counterSlice from "./slices/counterSlice";
import uiReducer from "./slices/uiSlice";

import todoSlice from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    ui: uiReducer,

    //practice
    counter: counterSlice,
    todos: todoSlice,
  },
});

export default store;
