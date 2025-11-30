import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  darkMode: localStorage.getItem('darkMode') === 'true',
  taskFormOpen: false,
  selectedTaskId: null,
  snackbar: {
    open: false,
    message: '',
    type: 'success', // success, error, warning, info
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    openTaskForm: (state) => {
      state.taskFormOpen = true;
    },
    closeTaskForm: (state) => {
      state.taskFormOpen = false;
      state.selectedTaskId = null;
    },
    selectTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        type: action.payload.type || 'success',
      };
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { 
  toggleSidebar, 
  toggleDarkMode, 
  openTaskForm, 
  closeTaskForm, 
  selectTask,
  showSnackbar,
  closeSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer;