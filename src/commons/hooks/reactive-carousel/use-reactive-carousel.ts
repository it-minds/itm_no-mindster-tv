import { useContainerQuery } from "react-container-query";
import { useEffect, useState } from "react";
import { Query } from "react-container-query/lib/interfaces";

export type MinMax = {
    minWidth?: number;
    maxWidth?: number;
};
export const useReactiveCarousel = (
    queries: MinMax[],
    numberOfItems: number,
) => {
    const query = queries.reduce((acc, query, index) => {
        return {
            ...acc,
            [`${index + 1}-items`]: {
                minWidth: query.minWidth,
                maxWidth: query.maxWidth,
            },
        };
    }, {} as Query);

    const [params, ref] = useContainerQuery(query, { width: 500, height: 500 });

    const [responsive, setResponsive] = useState({
        carousel: {
            breakpoint: { max: 5000, min: 0 },
            items: getItemCount(params, numberOfItems),
        },
    });

    useEffect(() => {
        const items = getItemCount(params, numberOfItems);

        setResponsive({
            carousel: {
                breakpoint: { max: 5000, min: 0 },
                items,
            },
        });
    }, [params]);

    return { responsive, ref };
};

const getItemCount = (
    params: { [key: `${number}-items`]: any },
    totalItems: number,
) => {
    const items = Object.keys(params).find(
        (key) => params[key as `${number}-items`] === true,
    );

    if (!items) {
        return 1;
    }

    const itemsToShow = parseInt(items.split("-")[0]);

    return itemsToShow > totalItems ? totalItems : itemsToShow;
};
