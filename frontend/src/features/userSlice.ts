import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Blog, User } from "../types/type";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface state {
    user:User
    active:boolean
    posts:Blog[]
    loading:boolean
    error:string
}

const initialState:state = {
    user:{
        id:'anonymous',
        name:'',
        role:'',
        bio:'',
    },
    active:false,
    posts:[],
    loading:false,
    error:'idle'
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        clearUser:(state)=>{
            state.user ={

                id:'anonymous',
                name:'',
                role:'',
                bio:'',
            },
            state.active = false,
            state.posts = [],
            state.loading = false,
            state.error ='idle'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserBlogs.pending,(state)=>{
            state.loading = true

        })
        builder.addCase(fetchUserBlogs.fulfilled,(state,action:any)=>{
            state.posts = action.payload
            state.loading = false
            state.error = 'idle'
        })
        builder.addCase(fetchUserBlogs.rejected,(state,action:any)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(fetchUser.fulfilled,(state,action:any)=>{
            state.user.id = action.payload.id
            state.user.name = action.payload.name
            state.user.role = action.payload.role || ''
            state.user.bio = action.payload.bio || ''
            state.active = true
            state.loading = false
        })
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchUser.rejected,(state,action:any)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const fetchUser = createAsyncThunk('user/fetchUser',async()=>{
    
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`,{
        headers:{
            Authorization:`Berear ${localStorage.getItem('token')}`
        }
    })
    return response.data
})

export const fetchUserBlogs=createAsyncThunk('user/fetchUserBlogs',async()=>{
   const response = await axios.get(`${BACKEND_URL}/api/v1/user/blogs`,{
    headers:{
        Authorization:`Berear ${localStorage.getItem('token')}`
    }
   })
   return response.data.blogs
})

export const {clearUser} = userSlice.actions
export default userSlice.reducer