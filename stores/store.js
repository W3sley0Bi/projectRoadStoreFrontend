import { createSlice, configureStore } from '@reduxjs/toolkit';

//sessio token
const tokenInitialState = {
  value: '',
};


if (process.browser) {
  tokenInitialState.value = localStorage.getItem('token') || '';
}

//user id
const uidInitialState = {
  value: null,
};

if (process.browser) {
  uidInitialState.value = localStorage.getItem('uid') || '';
}


//user role
const roleInitialState = {
  value: null,
};

if (process.browser) {
  roleInitialState.value = localStorage.getItem('role') || '';
}

const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenInitialState,
  reducers: {
    setToken: (state, action) => {
      if (process.browser) {
        localStorage.setItem('token', action.payload);
      }
      state.value = action.payload;
    },
  },
});


const uidSlice = createSlice({
  name: 'uid',
  initialState: uidInitialState,
  reducers: {
    setUID: (state, action) => {
      if (process.browser) {
        localStorage.setItem('uid', action.payload);
      }
      state.value = action.payload;
    },
  },
});

const roleSlice = createSlice({
  name: 'role',
  initialState: roleInitialState,
  reducers: {
    setRole: (state, action) => {
      if (process.browser) {
        localStorage.setItem('role', action.payload);
      }
      state.value = action.payload;
    },
  },
});



export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    uid: uidSlice.reducer,
    role: roleSlice.reducer
  }
});


export const { setToken } = tokenSlice.actions;
export const { setUID } = uidSlice.actions;
export const { setRole } = roleSlice.actions;

// export const tokenReducer = tokenSlice.reducer;
// export const uidReducer = uidSlice.reducer;
// export const roleReducer = roleSlice.reducer;

