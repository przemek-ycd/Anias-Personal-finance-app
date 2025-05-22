import React, { FC, useEffect, useMemo } from "react";
import { StyledWrapper } from "./NewsTicker.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/news.ts";
import { RootState, AppDispatch } from "../../store/store";

export const NewsTicker: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.items);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const formattedNews = useMemo(() => {
    return news.map((item) => {
      const parsedDate = new Date(item.datetime * 1000);
      const getFullYear = parsedDate.getFullYear();
      const getMonth = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const getDay = String(parsedDate.getDate()).padStart(2, "0");
      const formattedDate = `${getDay}/${getMonth}/${getFullYear}`;

      return {
        ...item,
        formattedDate,
      };
    });
  }, [news]);

  return (
    <StyledWrapper>
      {formattedNews.map((item) => (
        <div key={`${item.datetime}-${item.headline}`}>
          <p>{item.formattedDate}: </p>
          <p>{item.headline}</p>
        </div>
      ))}
    </StyledWrapper>
  );
};
