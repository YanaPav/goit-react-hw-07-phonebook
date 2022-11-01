import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://636039183e8f65f283c5f2cb.mockapi.io";


export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contactObj, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', contactObj);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});