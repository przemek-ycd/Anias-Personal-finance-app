import React, { FC, useEffect, useMemo } from "react";
import {
  StyledWrapper,
  StyledLoader,
  LoaderWrapper,
  ContentWrapper,
} from "./NewsTicker.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/news.ts";
import { RootState, AppDispatch } from "../../store/store";

export const NewsTicker: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: news, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const formattedNews = useMemo(() => {
    return news.map((item) => {
      const parsedDate = new Date(item.datetime * 1000);
      const fullYear = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const day = String(parsedDate.getDate()).padStart(2, "0");
      const formattedDate = `${day}/${month}/${fullYear}`;

      return {
        ...item,
        formattedDate,
      };
    });
  }, [news]);

  const handleRefresh = () => {
    dispatch(fetchNews());
  };

  return (
    <StyledWrapper>
      {status === "loading" && (
        <LoaderWrapper>
          <StyledLoader />
        </LoaderWrapper>
      )}

      {status === "failed" && (
        <ContentWrapper>
          <p>Failed to load news.</p>
          <button onClick={handleRefresh}>Try Again</button>
        </ContentWrapper>
      )}

      {status === "idle" &&
        formattedNews.map((item) => (
          <ContentWrapper key={`${item.datetime}-${item.headline}`}>
            <p>{item.formattedDate}: </p>
            <p>{item.headline}</p>
          </ContentWrapper>
        ))}
    </StyledWrapper>
  );
};
