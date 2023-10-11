import { Order } from "@/modules/lunch/api-client/types";
import { MealVariant } from "@/modules/lunch/lunch-module.hook";
import { useMeal } from "@/modules/lunch/meal/hook/meal.hook";
import { Chip } from "@nextui-org/chip";

const Meal = ({
    mealType,
    variants,
}: {
    mealType: Order["mealType"];
    variants: MealVariant[];
}) => {
    const { activeVariant, hasOrders } = useMeal(variants);

    return (
        <div className="row-span-2 grid h-full grid-rows-[inherit] gap-y-[inherit] @container">
            <div className="flex flex-col gap-y-2">
                <h2 className="font-serif text-lg">{mealType}</h2>
                <p className="text-sm text-gray-400 @xs:text-base">
                    {variants[activeVariant].menuItem.description}
                </p>
            </div>
            {hasOrders ? (
                <ul className="flex h-max flex-wrap gap-2">
                    {variants[activeVariant].orders.map((order) => (
                        <li key={order.firstName}>
                            <Chip variant="shadow" size="sm" color="secondary">
                                {order.firstName}
                            </Chip>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ingen bestillinger</p>
            )}
        </div>
    );
};

export default Meal;
