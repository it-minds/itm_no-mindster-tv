import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import { Chip } from "@nextui-org/chip";
import { Order } from "@/modules/lunch/api-client/api-client";

const LunchModule = () => {
    const { meals } = useLunchModule();

    return (
        <div className="flex h-full flex-col gap-9 bg-black p-8 font-sans @container">
            <h1 className="mb-2 text-xl font-semibold tracking-wide @xs:text-2xl @sm:text-3xl">
                Dagens Lunsj
            </h1>
            <div className="grid grid-cols-1 gap-y-7 @xl:grid-cols-3">
                {Object.entries(meals).map(([mealType, orders]) => (
                    <Meal key={mealType} mealType={mealType} orders={orders} />
                ))}
            </div>
        </div>
    );
};

const Meal = ({
    mealType,
    orders,
}: {
    mealType: Order["mealType"];
    orders: Order[];
}) => {
    return (
        <div className="flex flex-col gap-y-2 @xl:gap-y-4">
            <h2 className="font-serif text-lg">{mealType}</h2>
            <ul className="flex flex-wrap gap-2">
                {orders.map((order) => (
                    <li key={order.firstName}>
                        <Chip variant="shadow" size="sm" color="secondary">
                            {order.firstName}
                        </Chip>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LunchModule;
