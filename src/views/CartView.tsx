import { Button } from "@/components";
import { useUserContext } from "@/context";
import { IMAGE_BASE_URL } from "@/core/constants";
import { getPrice } from "@/functions/PriceCalculator";

export const CartView = () => {
    
    const { cart, addFavorite, removeCart } = useUserContext();

    cart.map((item) => (
        <div
            className="block bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
        >
            <img className="w-full h-[280px] object-cover" src={`${item.imagePath}`}/>
            <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{item.title}</p>
            <p>{getPrice(item.release)}</p>
            </div>
        </div>
    ));

    return (
        <section className="max-w-[1000px] mx-auto p-6 space-y-6 mb-20">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>

        {cart.length === 0 ? (
            <h1 className="text-400 text-zinc-500">Your cart is empty!</h1>
        ) : (
            <div className="space-y-4">
            <h1 className="text-400 text-zinc-500">Total: {cart.reduce((sum, item) => sum + getPrice(item.release), 0)}</h1>
            {cart.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex gap-4 bg-zinc-800 rounded-xl p-4 items-center">
                <img className="w-[80px] h-[120px] object-cover rounded-lg" src={`${IMAGE_BASE_URL}${item.imagePath}`} />
                <div className="flex-1">
                    <h2 className="font-bold text-xl">{item.title}</h2>
                    <p className="text-gray-400 capitalize">{item.type}</p>
                    {item.type !== 'tv' ? (<p className="text-gray-400">{getPrice(item.release)}</p>) : (<p>Not purchasable.</p>)}
                </div>

                {item.type !== 'tv' && (
                    <Button onClick={() => addFavorite(item)}>
                    Add to favorites
                    </Button>
                )}

                <Button variant="grey" onClick={() => removeCart(item.id, item.type)}>
                    Remove
                </Button>
                </div>
            ))}
            </div>
        )}
        </section>
    );
}