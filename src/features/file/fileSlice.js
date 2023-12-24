import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  loading: false,
};

export const getFiles = createAsyncThunk(
  "file/getFiles",
  async ({ url, nodeId, maxItems }) => {
    const response = await fetch(
      `${url}/${nodeId}/children?maxItems=${maxItems}&orderBy=isFolder%20desc%2CmodifiedAt%20desc`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(localStorage.getItem("token")),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((data) => data.json());

    return response;
  }
);

export const createFolder = createAsyncThunk(
  "file/createFolder",
  async ({ url, nodeId, data }) => {
    const response = await fetch(
      `${url}/${nodeId}/children?autoRename=true&include=allowableOperations`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(localStorage.getItem("token")),
        },
        body: JSON.stringify({
          nodeType: "cm:folder",
          name: data.name,
          properties: {
            "cm:title": data.title,
            "cm:description": data.description,
          },
        }),
      }
    ).then((data) => data.json());

    return response;
  }
);

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async ({ url, id, formData }) => {
    const response = await fetch(
      `${url}/${id}/children?autoRename=true&include=allowableOperations`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(localStorage.getItem("token")),
        },
        body: formData,
      }
    ).then((data) => data.json());

    return response;
  }
);

export const getFilesById = createAsyncThunk(
  "file/getFilesById",
  async ({ url, nodeId, maxItems }) => {
    const response = await fetch(
      `${url}/${nodeId}/children?maxItems=${maxItems}&orderBy=isFolder%20desc%2CmodifiedAt%20desc`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(localStorage.getItem("token")),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((data) => data.json());

    return response;
  }
);

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getFiles
    builder.addCase(getFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.files = action.payload.list?.entries;
    });
    builder.addCase(getFiles.rejected, (state) => {
      state.loading = false;
    });

    //createFolder
    builder.addCase(createFolder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.loading = false;
      state.files.unshift(action.payload);
    });
    builder.addCase(createFolder.rejected, (state) => {
      state.loading = false;
    });

    //uploadFile
    builder.addCase(uploadFile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.loading = false;
      state.files.push(action.payload);
    });
    builder.addCase(uploadFile.rejected, (state) => {
      state.loading = false;
    });

    //getFilesById
    builder.addCase(getFilesById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilesById.fulfilled, (state, action) => {
      state.loading = false;
      state.files = action.payload.list?.entries;
    });
    builder.addCase(getFilesById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default fileSlice.reducer;
