import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { NewsTicker } from "./NewsTicker";
import configureStore from "redux-mock-store";

jest.mock("../../store/news.ts", () => ({
    fetchNews: () => ({ type: "FETCH_NEWS_MOCK" }),
}));

const mockStore = configureStore([]);

describe("NewsTicker", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            news: {
                items: [
                    { id: 1, datetime: 1747249920, headline: "Has the epic rebound in U.S. stocks come too far, too fast? What investors chasing the rally should keep in mind." },
                    { id: 2, datetime: 1747248008, headline: "Netflix says its ad tier now has 94 million monthly active users" },
                ],
            },
        });
    });

    it("renders news items correctly", async () => {

        render(
        <Provider store={store}>
            <NewsTicker />
        </Provider>
        );

        const dates = await screen.findAllByText("14/05/2025:");

        expect(await screen.findByText("Has the epic rebound in U.S. stocks come too far, too fast? What investors chasing the rally should keep in mind.")).toBeInTheDocument();
        expect(await screen.findByText("Netflix says its ad tier now has 94 million monthly active users")).toBeInTheDocument();
        expect(dates.length).toBe(2);
    });
});