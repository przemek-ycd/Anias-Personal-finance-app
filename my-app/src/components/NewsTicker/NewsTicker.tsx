import React, { FC, useEffect } from "react";
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

  const formatDate = (date: number): string => {
    const parsedDate = new Date(date * 1000);
    const getFullYear = parsedDate.getFullYear();
    const getMonth = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const getDay = String(parsedDate.getDate()).padStart(2, "0");
    return getDay + "/" + getMonth + "/" + getFullYear;
  };

  return (
    <StyledWrapper>
      {news.map((item) => (
        <div key={item.id}>
          <p>{formatDate(item.datetime)}: </p>
          <p>{item.headline}</p>
        </div>
      ))}
    </StyledWrapper>
  );
};
