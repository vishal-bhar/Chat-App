
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../lab/axios.js";
import {connectSocket, disconnectSocket} from "../../lab/socket.js"
import { toast } from "react-toastify";




export const getUser=createAsyncThunk("user/me",async(_, thunkAPI)=>{
    try {
        const res=await axiosInstance.get("/user/me");
        console.log(res)
        connectSocket(res.data.user);
        return res.data.user;
    } catch (error) {
        console.log("error fetching user", error);
        return thunkAPI.rejectWithValue(error.response?.data || "failed to fetch user");
    }
});

export const logout=createAsyncThunk("user/sign-out",async(_,thunkAPI)=>{
    try {
        await axiosInstance.get("/user/sign-out");
        disconnectSocket();
        return null
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
});

export const login=createAsyncThunk("user/sign-in",async(data,thunkAPI)=>{
    try {
       const res= await axiosInstance.post("/user/sign-in",data);
       connectSocket(res.data);
       toast.success("Login successfull")
        return res.data
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
});

export const signUp=createAsyncThunk("user/sign-up",async(data,thunkAPI)=>{
    try {
        const res=await axiosInstance.post("/user/sign-up",data);
        connectSocket(res.data);
        toast.success("Sign up successfully");
        return res.data
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message)
    }

})

 export const authSlice=createSlice({
    name:"auth",
    initialState:{
        authUser:null,
        isSigningup:false,
        isLogginIn:false,
        isUpdatingProfile:true,
        isCheckingAuth:true,
        onlineUsers:[],
    },
    reducers:{
        setOnlineUser(state,action){
            state.onlineUsers = action.payload;
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
            })
            .addCase(logout.fulfilled,(state)=>{
                state.authUser=null;
            })
             .addCase(logout.rejected,(state)=>{
                state.authUser=state.authUser;
            })
            .addCase(login.pending,(state)=>{
                state.isLogginIn=true;
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.authUser=action.payload;
                state.isLogginIn=false;
            })
            .addCase(login.rejected,(state)=>{
                state.isLogginIn=false;
            })
            .addCase(signUp.pending,(state)=>{
                state.isSigningup=true;
            })
            .addCase(signUp.fulfilled,(state,action)=>{
                state.authUser=action.payload;
                state.isSigningup=false;
            })
            .addCase(signUp.rejected,(state)=>{
                state.isSigningup=false
            })
    },
    
});

export const {setOnlineUser} = authSlice.actions;

export default authSlice.reducer; 