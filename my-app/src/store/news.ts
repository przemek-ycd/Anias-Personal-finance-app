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
  error: boolean;
}

const initialState: NewsState = {
  items: [],
  status: "idle",
  error: false,
};

export const fetchNews = createAsyncThunk<NewsItem[]>(
  "news/fetchNews",
  async () => {
    const response = await fetch(
      "https://finnhub.io/api/v1/news?category=general&token=d0h1jqpr01qv1u34n0fgd0h1jqpr01qv1u34n0g0"
    );
    const data = await response.json();
    return data.slice(0, 10);
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = false;
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
        state.error = true;
      });
  },
});

export default newsSlice.reducer;
