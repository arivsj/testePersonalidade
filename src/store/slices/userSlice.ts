import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user state type
export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
};

// Create the slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state.id = action.payload.id ?? state.id;
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
    },
  },
});

// Export the actions
export const { setUser, clearUser, updateUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;