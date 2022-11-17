import { createSlice } from "@reduxjs/toolkit";
import { getTokenDataFromLocalStorage } from "../../utils/serverUtils";
import { convertTokenToObject } from "../../utils/serverUtils";

const initialState = {
    token: getTokenDataFromLocalStorage(),

    userInfor: convertTokenToObject(),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        USER_REQUEST: (state) => {
            state.loading = true;
        },
        USER_LOGIN_REQUEST: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.loading = true;
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },

        USER_LOGIN_SUCCESS: (state, action) => {
            state.token = action.payload;
            state.userInfor = convertTokenToObject();
            state.isloggedInSuccess = true;
            state.loading = false;
        },

        USER_LOGIN_FAIL: (state, action) => {
            state.token = null;
            state.isloggedInSuccess = false;
            state.loginErrorMessage = action.payload;
            state.loading = false;
        },
        USER_LOGIN_VIA_GOOGLE_FAIL: (state, action) => {
            state.token = null;
            // state.isloggedInSuccess = false;
            state.loginViaGoogleFail = true;
            state.loginErrorMessage = action.payload;
            state.loading = false;
        },
        USER_LOGOUT_SUCCESS: (state) => {
            state.token = null;
            state.userInfor = null;
            state.loading = false;
            state.isloggedOutSuccess = true;
        },
        USER_CLEAR: (state) => {
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },
        USER_UPDATE_SUCCESS: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.userInfor = convertTokenToObject();
            state.loading = false;
        },
    },
});

export const {
    USER_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_CLEAR,
    USER_UPDATE_SUCCESS,
    USER_LOGIN_VIA_GOOGLE_FAIL,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
