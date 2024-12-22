import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@shared/user";

interface UserState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, setError } = userSlice.actions;
export default userSlice.reducer;
