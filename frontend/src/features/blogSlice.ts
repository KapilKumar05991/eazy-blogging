import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { BACKEND_URL } from "../config";
import { Blog } from "../types/type";



interface state {
  blogs:Array<Blog>;
  blogDetails:{[id:string]:Blog};
  blogLoading:boolean;
  blogsLoading: boolean;
  error: string;
}

const initialState: state = {
  blogs: [],
  blogDetails:{},
  blogLoading:true,
  blogsLoading: true,
  error: "idle",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogDetails: (state, action: PayloadAction<Blog>) => {
        state.blogDetails[action.payload.id] = action.payload
    },
    clearBlogSlice:(state)=>{
      state.blogs = []
      state.blogDetails = {}
    },
    setBlogLoading: (state, action:PayloadAction<boolean>) => {
      state.blogLoading = action.payload
    },
    setError:(state,action)=>{
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action:PayloadAction<Blog[]>) => {
        state.blogsLoading = false;
        state.blogs = action.payload;
        state.error = 'idle'
      })
      .addCase(fetchBlogs.rejected, (state, action:any) => {
        state.blogsLoading = false;
        state.error = action.error.message;
      })
  },
});

export const fetchBlogById = (id: string) => async (dispatch: any, getState:()=> RootState) => {
  if(id in getState().blog.blogDetails){
    dispatch(setBlogLoading(false))
    return
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Berear ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setBlogLoading(false))
    dispatch(setBlogDetails(response.data.blog))
    dispatch(setError('idle'))
  } catch(e:any) {
    dispatch(setError(e.message))
  }
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Berear ${localStorage.getItem("token")}`,
      },
    });
    return response.data.blogs;
});

export const {setBlogDetails,clearBlogSlice,setBlogLoading,setError} = blogSlice.actions
export default blogSlice.reducer;
