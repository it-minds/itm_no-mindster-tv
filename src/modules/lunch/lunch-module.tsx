import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import React, { useEffect, useState } from "react";
import Meal from "@/modules/lunch/meal/meal";
import { useContainerQuery } from "react-container-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useReactiveCarousel } from "@/commons/hooks/reactive-carousel/use-reactive-carousel";

const LunchModule = () => {
    const { ref, responsive, meals, hasOrders } = useLunchModule();

    return (
        <div
            ref={ref}
            className="grid h-full grid-rows-[max-content_1fr] gap-7 bg-black pb-8 font-sans @container"
        >
            <h1 className="@ px-8 pt-8 text-2xl font-semibold tracking-wide @xs:text-3xl">
                Dagens Lunsj
            </h1>
            {hasOrders ? (
                <div className="relative w-full overflow-hidden pb-12">
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        arrows={false}
                        autoPlay={true}
                        infinite={true}
                        showDots={true}
                        itemClass="px-8"
                        renderDotsOutside={true}
                        customDot={<CustomDot />}
                        autoPlaySpeed={10000}
                        responsive={responsive}
                    >
                        {Object.entries(meals).map(([mealType, mealVariants]) =>
                            mealVariants.map((meal) => (
                                <Meal key={mealType} meal={meal} />
                            )),
                        )}
                    </Carousel>
                </div>
            ) : (
                <p className="px-8">
                    Ingen bestillinger i dag. Husk å bestille til i morgen!
                </p>
            )}
        </div>
    );
};

const CustomDot = (props: any) => {
    return (
        <div
            className={`mx-0.5 h-3 w-3 cursor-pointer rounded-full border-2 border-gray-500 hover:bg-gray-500 ${
                props.active ? "bg-gray-500" : ""
            }`}
        />
    );
};

export default LunchModule;
