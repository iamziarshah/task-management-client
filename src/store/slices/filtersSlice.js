import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'created_at',
  sortOrder: 'desc',
  status: '',
  priority: '',
  searchQuery: '',
  dateRange: {
    start: null,
    end: null,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { 
  setSortBy, 
  setSortOrder, 
  setStatus, 
  setPriority, 
  setSearchQuery, 
  setDateRange, 
  resetFilters 
} = filtersSlice.actions;

export default filtersSlice.reducer;