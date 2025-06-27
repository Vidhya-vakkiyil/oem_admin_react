import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const API_URL = '/auth/login';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post(API_URL, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, thunkAPI) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, newPassword, confirmPassword }, thunkAPI) => {
  try {
    const response = await api.post(`/auth/reset-password?token=${token}`, { newPassword, confirmPassword });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const fetchAuthUser = createAsyncThunk('auth/fetchCurrentUser', async(_, thunkAPI) => {
  try{
    const res = await api.get('/auth/profile', {withCredentials: true});
    return res.data;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data || 'Not authenticated');
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    permissions: [],
    status: 'idle',
    error: null,
    loading: false,
    forgotStatus: 'idle',
    forgotMessage: null,
    resetStatus: 'idle',
    resetMessage: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.permissions = [];
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.permissions = action.payload?.user?.Role?.Permissions.map((permission) => {
          return permission.name
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotStatus = 'loading';
        state.forgotMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotStatus = 'succeeded';
        state.forgotMessage = action.payload.message || 'Reset link sent!';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotStatus = 'failed';
        state.forgotMessage = action.payload || 'Something went wrong';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetStatus = 'loading';
        state.resetMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetStatus = 'succeeded';
        state.resetMessage = action.payload.message || 'Password has been reset';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetStatus = 'failed';
        state.resetMessage = action.payload || 'Something went wrong';
      })

      // fetchauthUser
      .addCase(fetchAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.permissions = action.payload?.Role?.Permissions.map((permission) => {
          return permission.name
        });
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;