import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import React from "react";
import Meal from "@/modules/lunch/meal/meal";

const LunchModule = () => {
    const { meals, hasOrders } = useLunchModule();

    return (
        <div className="flex h-full flex-col gap-7 bg-black p-8 font-sans @container">
            <h1 className="mb-2 text-xl font-semibold tracking-wide @xs:text-2xl @sm:text-3xl">
                Dagens Lunsj
            </h1>
            {hasOrders ? (
                <div className="grid grid-cols-1 gap-x-2 gap-y-5 @lg:grid-cols-3 @lg:grid-rows-2">
                    {Object.entries(meals).map(([mealType, mealVariants]) => (
                        <Meal
                            key={mealType}
                            mealType={mealType}
                            variants={mealVariants}
                        />
                    ))}
                </div>
            ) : (
                <p>Ingen bestillinger i dag. Husk å bestille til i morgen!</p>
            )}
        </div>
    );
};
export default LunchModule;
