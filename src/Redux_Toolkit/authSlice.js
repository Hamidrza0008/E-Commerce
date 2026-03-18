import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : JSON.parse(localStorage.getItem("users")) || [],
    user : JSON.parse(localStorage.getItem("currentUser")) || null,
    isAuthenticated : JSON.parse(localStorage.getItem("currentUser"))?true : false,
    error : null
}

const authSlice = createSlice({
    name : "authSlice" ,
    initialState, 
    reducers : {
        register : (state , action) => {
            const newUser = action.payload;

            const existingUser = state.users.find((user) => user.email === newUser.email);

            if(existingUser) {
                state.error = "Email Already Exist";
                return;
            }

            state.users.push(newUser);
            localStorage.setItem("users" , JSON.stringify(state.users));
            state.error = null;
        }  ,

        login : (state , action) => {
            const {email , password} = action.payload;

            const user = state.users.find((user) => user.email === email && user.password === password);

            if(user){
                state.user = user ; 
                state.isAuthenticated = true;
                localStorage.setItem("currentUser" , JSON.stringify(state.user));
                state.error = null;
            }

            else{
                state.error = "Invalide User or Password"
            }
        } ,

        logout : (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("currentUser")
        }
    }
})

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;