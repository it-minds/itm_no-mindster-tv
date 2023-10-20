import { act, renderHook, waitFor } from "@testing-library/react";
import {
    MinMax,
    useReactiveCarousel,
} from "@/commons/hooks/reactive-carousel/use-reactive-carousel";
import React, { createRef } from "react";
import theoretically from "jest-theories";
import { useContainerQuery } from "react-container-query";

jest.mock("react-container-query");
const useContainerQueryMock = useContainerQuery as jest.Mock;

describe("useReactiveCarousel", () => {
    const testQuery = [
        { minWidth: 0, maxWidth: 100, items: 1 },
        { minWidth: 100, maxWidth: 200, items: 2 },
        { minWidth: 300, maxWidth: 400, items: 3 },
        { minWidth: 400, maxWidth: 500, items: 4 },
        { minWidth: 500, maxWidth: 600, items: 5 },
        { minWidth: 600, maxWidth: 700, items: 6 },
        { minWidth: 700, maxWidth: 800, items: 7 },
    ];

    const queryTheories = [
        { width: 50, items: 1, query: testQuery },
        { width: 150, items: 2, query: testQuery },
        { width: 350, items: 3, query: testQuery },
        { width: 450, items: 4, query: testQuery },
        { width: 550, items: 5, query: testQuery },
        { width: 650, items: 6, query: testQuery },
        { width: 750, items: 7, query: testQuery },
    ];

    theoretically(
        "should show {items} item when width is {width} and query is {query}",
        queryTheories,
        async ({ width, items, query }) => {
            // given
            useContainerQueryMock.mockReturnValue([
                {
                    [`${items}-items`]: true,
                },
                createRef(),
            ]);

            // when
            const { result } = renderHook(() =>
                useReactiveCarousel(query, items),
            );

            // then
            await waitFor(() => {
                const itemNumber = result.current.responsive.carousel.items;
                expect(itemNumber).toEqual(items);
            });
        },
    );

    const maxItemsTheories = [
        { maxItems: 1 },
        { maxItems: 2 },
        { maxItems: 3 },
    ];

    theoretically(
        "should only show {maxItems} even though there is more space",
        maxItemsTheories,
        async ({ maxItems }) => {
            // given
            useContainerQueryMock.mockReturnValue([
                {
                    [`${maxItems + 1}-items`]: true,
                },
                createRef(),
            ]);

            // when
            const { result } = renderHook(() =>
                useReactiveCarousel(testQuery, maxItems),
            );

            // then
            await waitFor(() => {
                const itemNumber = result.current.responsive.carousel.items;
                expect(itemNumber).toEqual(maxItems);
            });
        },
    );
});

export {};
