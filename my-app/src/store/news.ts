import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface NewsItem {
  id: number;
  headline: string;
  datetime: number;
  url: string;
  source: string;
}

interface NewsState {
  items: NewsItem[];
  status: "idle" | "loading" | "failed";
  hasError: Error[];
}

const initialState: NewsState = {
  items: [],
  status: "idle",
  hasError: [],
};

const API_TOKEN = "d0h1jqpr01qv1u34n0fgd0h1jqpr01qv1u34n0g0";

export const fetchNews = createAsyncThunk<
  NewsItem[],
  void,
  { rejectValue: string }
>("news/fetchNews", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=general&token=${API_TOKEN}`
    );
    const data = await response.json();
    return data.slice(0, 10);
  } catch (error) {
    return rejectWithValue("Failed to fetch news.");
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<NewsItem[]>) => {
          state.status = "idle";
          state.items = action.payload;
        }
      )
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
        state.hasError.push(new Error("Unknown error occurred."));
      });
  },
});

export default newsSlice.reducer;
