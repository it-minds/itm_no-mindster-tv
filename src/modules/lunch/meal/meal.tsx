import { Order } from "@/modules/lunch/api-client/types";
import { MealVariant } from "@/modules/lunch/lunch-module.hook";
import { useMeal } from "@/modules/lunch/meal/hook/meal.hook";
import { Chip } from "@nextui-org/chip";

const Meal = ({ meal }: { meal: MealVariant }) => {
    const { hasOrders } = useMeal(meal);

    return (
        <div className="grid h-full grid-rows-[max-content_1fr_max-content] gap-y-4 @container">
            <div className="flex flex-col gap-y-3">
                <h2 className="font-serif text-xl @xs:text-2xl">
                    {meal.menuItem.mealType.name}
                </h2>
                <p className="text-lg text-gray-400 @xs:text-xl">
                    {meal.menuItem.description}
                </p>
            </div>
            {hasOrders ? (
                <ul className="flex h-max flex-wrap gap-2">
                    {meal.orders.map((order) => (
                        <li key={order.firstName}>
                            <Chip variant="shadow" color="secondary">
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
