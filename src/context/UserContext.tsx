import { MOVIE_GENRES, TV_GENRES } from "@/core/constants";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserItem = { // per item that'll be stored in favorites/cart (a movie, a tv show, a tv season)
    type: 'movie' | 'tv' | 'season';
    id: number;
    title: string;
    release: number; // release date
    imagePath: string | null;
    seasonNumber?: number; // if it's a season ("?" means optional. only for tv)
    tvId?: number;
}

export type UserContextType = { // contains all the context
    username: string; // username you see on the top of screen ykyk
    favorites: UserItem[]; // array of UserItem types (basically all your favorites)
    cart: UserItem[];
    moviePreferences: number[]; // array of numbers, the IDs for the selected preferred genres in settings
    tvPreferences: number[];
    addFavorite: (item: UserItem) => void; // function description for a function that is made later, takes/returns x and y
    addCart: (item: UserItem) => void; // takes a UserItem but function returns nothing
    clearCart: () => void;
    setUsername: (username: string) => void;
    setMoviePreferences: React.Dispatch<React.SetStateAction<number[]>>; // takes array of selected genres' IDs
    setTvPreferences: React.Dispatch<React.SetStateAction<number[]>>; // takes array of selected genres' IDs
    removeFavorite: (id: number, type: UserItem['type']) => void; // when looking in existing list: need item's id + type because movie/tv can hv same id
    removeCart: (id: number, type: UserItem['type']) => void;
    clearFavorites: (type: string) => void; 
    isFavorite: (id: number, type: UserItem['type']) => boolean; // UserItem['variableInUserItemWithThisName']
    isCart: (id: number, type: UserItem['type']) => boolean;
}

export const USERNAME_KEY = "username_key"; // keys for fetching values from localStorage, names r lowkey arbitrary
export const FAVORITES_KEY = "favorites_key";
export const CART_KEY = "cart_key";
export const MOVIE_GENRES_KEY = "movie_genres_key";
export const TV_GENRES_KEY = "tv_genres_key";

export function load<Type>(key: string, backup: Type): Type { // to load any type from localStorage
    const saved = localStorage.getItem(key); // get item is in localStorage

    if (!saved) {
        return backup; // when the item ain't in there
    }

    try {
        return JSON.parse(saved) as Type; // note: localStorage only stores stuff in strings, so you have to turn it into Type
    } catch {
        return backup;
    }
} 

function sameItem (x: UserItem, y: UserItem) { // checks if two items are the same (for adding/removing favs/cart)
    return x.id === y.id && x.type === y.type; // if same, must have same id and type
}

export const UserContext = createContext<UserContextType | undefined>(undefined); // this is global and lets the entire site use the info.

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => { // stuff shared by the whole ahh website
    const [username, setUsername] = useState(() => load(USERNAME_KEY, 'Username')); // using states to save the changeable things.
    const [favorites, setFavorites] = useState<UserItem[]>(() => load(FAVORITES_KEY, [])); // favorites is an array. initially empty
    const [cart, setCart] = useState(() => load<UserItem[]>(CART_KEY, []));
    // const [moviePreferences, setMoviePreferences] = useState<number[]>(() => load(MOVIE_GENRES_KEY, []));
    // const [tvPreferences, setTvPreferences] = useState<number[]>(() => load(MOVIE_GENRES_KEY, []));
    const [moviePreferences, setMoviePreferences] = useState<number[]>(
        () => load(MOVIE_GENRES_KEY, MOVIE_GENRES.map((genre) => genre.id))
    );
    const [tvPreferences, setTvPreferences] = useState<number[]>(
        () => load(TV_GENRES_KEY, TV_GENRES.map((genre) => genre.id))
    );

    useEffect (() => { // useEffect to store stuff into localStorage, with respective deps
        localStorage.setItem(USERNAME_KEY, JSON.stringify(username)) // must be stringified to put in localStorage
    }, [username]); // only when username changes, trigger this useEffect

    useEffect (() => {  
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)) 
    }, [favorites]);

    useEffect (() => {  
        localStorage.setItem(CART_KEY, JSON.stringify(cart)) 
    }, [cart]);
    
    useEffect (() => {  
        localStorage.setItem(MOVIE_GENRES_KEY, JSON.stringify(moviePreferences)) 
    }, [moviePreferences]);    
    
    useEffect (() => {  
        localStorage.setItem(TV_GENRES_KEY, JSON.stringify(tvPreferences)) 
    }, [tvPreferences]);

    function addFavorite(item: UserItem) { // must remove item if in cart, then add to favorites.
        if (isFavorite(item.id, item.type)) {
            removeFavorite(item.id, item.type);
            return;
        }

        setCart((prev) => prev.filter((cartItem) => !sameItem(cartItem, item))); // filter only keeps TRUE items (if NOT the same item, then keep)
        setFavorites((prev) => {
            if (prev.some((currentItem) => sameItem(currentItem, item))) { 
                return prev; // if already added in favorites
            } else {
                return [...prev, item]; 
            }
        });
    }

    function addCart(item: UserItem) { // must remove item if in cart, then add to favorites. 
        if (item.type === 'tv') { // cannot add tv's
            return;
        }

        if (isCart(item.id, item.type)) {
            removeCart(item.id, item.type);
            return;
        }
       
        setFavorites((prev) => prev.filter((cartItem) => !sameItem(cartItem, item)));
        setCart((prev) => {
            if (prev.some((currentItem) => sameItem(currentItem, item))) { 
                return prev; // if already added in cart
            } else {
                return [...prev, item]; 
            }
        });
    }

    function removeFavorite(id: number, type: UserItem['type']) {
        setFavorites((prev) => prev.filter((item) => item.id !== id || item.type !== type)); // filter: diff id | type = true (keep). same id & type = false
    }

    function clearCart() {
        setCart([]);
    }

    function clearFavorites(type: string) {
        setFavorites( (prev) => prev.filter((items) => items.type !== type)); // remove unless diff type
    }

    function removeCart(id: number, type: UserItem['type']) {
        setCart((prev) => prev.filter((item) => item.id !== id || item.type !== type)); 
    }

    function isFavorite(id: number, type: UserItem['type']) {
        return favorites.some((item) => item.id === id && item.type === type); // must have same id AND type.
    }

    function isCart(id: number, type: UserItem['type']) {
        return cart.some((item) => item.id === id && item.type === type); // must have same id AND type.
    }

    return (
        <UserContext.Provider 
            value={{ // ts the stuff in UserContextType that's shared globally
                username,
                favorites,
                cart,
                moviePreferences,
                tvPreferences,
                setUsername,
                addFavorite,
                addCart,
                clearFavorites,
                clearCart,
                setMoviePreferences,
                setTvPreferences,
                removeFavorite,
                removeCart,
                isFavorite,
                isCart,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext() { // shortcut for use usercontext
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a StoreProvider");
    }
    return context;
};