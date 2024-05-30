import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    picture: "",
    email: "",
    phone: "",
    user:"",
}


const userSlice = createSlice( {
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.picture = action.payload.picture;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.user = action.payload.user;
        }
    }
} ) 


export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;