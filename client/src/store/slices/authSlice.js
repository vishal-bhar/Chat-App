
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../lab/axios.js";
import {connectSocker} from "../../lab/socket.js"




export const getUser=createAsyncThunk("user/me",async(_, thunkAPI)=>{
    try {
        const res=await axiosInstance.get("/user/me");
        connectSocker(res.data.user);
        return res.data.user;
    } catch (error) {
        console.log("error fetching user", error);
        return thunkAPI.rejectWithValue(error.response.data || "failed to fetch user");
    }
});



const authSlice=createSlice({
    name:"auth",
    initialState:{
        authUser:null,
        isSigningup:false,
        isSigningIn:false,
        isUpdatingProfile:true,
        isCheckingAuth:true,
        onlineUsers:[],
    },
    reducers:{
        setOnlineUser(state,action){
            state.onlineUsers=action.payload;
        },
    },

     extraReducers:(builder)=>{
            builder
            .addCase(getUser.fulfilled,(state,action)=>{
                state.authUser=action.payload;
                state.isCheckingAuth=false;
            })
            .addCase(getUser.rejected,(state,action)=>{
                state.authUser=null;
                state.isCheckingAuth=false;
            });
    },
    
});

export const {setOnlineUser} =authSlice.actions;

export default authSlice.reducer;