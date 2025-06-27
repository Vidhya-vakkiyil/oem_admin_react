import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import roleReducer from './slices/roleSlice';
import permissionReducer from './slices/permissionSlice';
import companyReducer from './slices/companiesSlice';
import branchReducer from './slices/branchesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    companies: companyReducer,
    branches: branchReducer
  },
});

export default store;