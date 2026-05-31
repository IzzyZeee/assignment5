import { Button } from "@/components";
import { useUserContext } from "@/context";
import { IMAGE_BASE_URL } from "@/core/constants";
import { calculatePrice, getDisplayPrice } from "@/functions/PriceCalculator";
import { useState } from "react";

export const FavoritesView = () => {
    
    const { favorites, addCart, removeFavorite, clearFavorites } = useUserContext();
    const [type, setType] = useState<'movie' | 'season'>('movie') // state for buttons to see which button you clicked
    const filtered = favorites.filter((item) => type === item.type);

    const getFavoritesLength = (type: string) => { // dependent on type
        return favorites.filter((item) => type === item.type).length // amount of items in favorites for a certain type
    }

    return (
        <section className="max-w-[1000px] mx-auto p-6 space-y-6 mb-20">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>

        <div>
            {favorites.length > 0 && (
                <div className="flex gap-2">
                    <Button variant={type === 'movie' ? 'primary' : 'grey'} onClick={() => setType('movie')}>Movies</Button>
                    <Button variant={type === 'season' ? 'primary' : 'grey'} onClick={() => setType('season')}>TV</Button>
                </div>
            )}
        </div>

        {favorites.length === 0 ? (
            <h1 className="text-400 text-zinc-500">You have no favorites saved!</h1>
        ) : (
            <div className="space-y-4">
                <div>
                    {
                        getFavoritesLength(type) > 0 && (
                            <Button variant='primary' onClick={() => clearFavorites(type)}>
                                Clear
                            </Button>
                        )
                    }
                </div>
            {filtered.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex gap-4 bg-zinc-800 rounded-xl p-4 items-center">
                <img className="w-[80px] h-[120px] object-cover rounded-lg" src={`${IMAGE_BASE_URL}${item.imagePath}`} />
                <div className="flex-1">
                    <h2 className="font-bold text-xl">{item.title}</h2>
                    <p className="text-gray-400 capitalize">{item.type}</p>
                    {item.type !== 'tv' ? (<p className="text-gray-400">{getDisplayPrice(calculatePrice(item.release))}</p>) : (<p>Not purchasable.</p>)}
                </div>

                {item.type !== 'tv' && (
                    <Button onClick={() => addCart(item)}>
                    Add to cart
                    </Button>
                )}

                <Button variant="grey" onClick={() => removeFavorite(item.id, item.type)}>
                    Remove
                </Button>
                </div>
            ))}
            </div>
        )}
        </section>
    );
}