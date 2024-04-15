import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from "../apiService";

const initialState = {
    books: [],
    detail: [],
    readingList: [],
    searchQuery: "",
    error: "",
    pageNum: 1,
    limit: 10,
    status: "idle",
}

let url = `/books?_page=${initialState.pageNum}&_limit=${initialState.limit}`

export const getAllBook = createAsyncThunk('getAllBook', async () => {
    const response = await api.get(url)
    return response.data
})

export const getDetailBook = createAsyncThunk('getDetailBook', async (id) => {
    const response = await api.get(`/books/${id}`)
    return response.data
})

export const nextPagination = createAsyncThunk('nextPagination', async (value) => {
    const response = await api.get(`/books?_page=${value}&_limit=${initialState.limit}`)
    // console.log(value)
    return response.data
})

export const search = createAsyncThunk('search', async (text) => {
    const response = await api.get(url + `&q=${text}`)
    // console.log(response)
    return response.data
})

export const getFavorites = createAsyncThunk('getFavorites', async () => {
    const response = await api.get(`/favorites`)
    // console.log(response)
    return response.data
})

export const addFavorites = createAsyncThunk('addFavorites', async (book) => {
    const response = await api.post(`/favorites`, book)
    // console.log(response)
    return response.data
})

export const setRemovedBook = createAsyncThunk('setRemovedBookId', async (bookID) => {
    const response = await api.delete(`/favorites/${bookID}`)
    console.log(response)
    return response.data
})



export const bookSlice = createSlice({
    name: 'book',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllBook.fulfilled, (state, action) => {
                state.status = 'idle';
                state.books = action.payload;
            })
            .addCase(getAllBook.rejected, (state, action) => {
                state.status = 'rejected';
                state.books = action.payload;
                state.error = action.error.message
            });
        builder
            .addCase(nextPagination.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(nextPagination.fulfilled, (state, action) => {
                state.status = 'idle';
                state.books = action.payload;
                // console.log(action);
                state.pageNum++;
            })
            .addCase(nextPagination.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            });
        builder
            .addCase(search.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(search.fulfilled, (state, action) => {
                state.status = 'idle';
                state.books = action.payload;
                state.searchQuery = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
        builder
            .addCase(getDetailBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDetailBook.fulfilled, (state, action) => {
                state.status = 'idle';
                state.detail = action.payload;
            })
            .addCase(getDetailBook.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
        builder
            .addCase(getFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.status = 'idle';
                state.readingList = action.payload;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
        builder
            .addCase(addFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFavorites.fulfilled, (state, action) => {
                state.status = 'idle';
                state.readingList.push(action.payload);
            })
            .addCase(addFavorites.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
        builder
            .addCase(setRemovedBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setRemovedBook.fulfilled, (state, action) => {
                state.status = 'idle';
                state.readingList.pop(action.payload);
            })
            .addCase(setRemovedBook.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })

    }
})

export default bookSlice.reducer