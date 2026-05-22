import { createContext } from "react";

export type UserItem = { // per item that'll be stored in favorites/cart (a movie, a tv show, a tv season)
    type: 'movie' | 'tv' | 'season';
    id: number;
    title: string;
    release: number; // release date
    imagePath: string | null;
    seasonNumber?: number; // if it's a season ("?" means optional. only for tv)
}

export type UserContextType = { // contains all the context
    username: string; // username you see on the top of screen ykyk
    favorites: UserItem[]; // array of UserItem types (basically all your favorites)
    cart: UserItem[];
    genrePreferences: number[]; // array of numbers, the IDs for the selected preferred genres in settings
    setFavorite: (item: UserItem) => void; // function description for a function that is made later, takes/returns x and y
    setCart: (item: UserItem) => void; // takes a UserItem but function returns nothing
    setGenrePreferences: (preferences: number[]) => void; // takes array of selected genres' IDs
    removeFavorite: (id: number, type: UserItem['type']) => void; // when looking in existing list: need item's id + type because movie/tv can hv same id
    removeCart: (id: number, type: UserItem['type']) => void;
    isFavorite: (id: number, type: UserItem['type']) => boolean; // UserItem['variableInUserItemWithThisName']
    isInCart: (id: number, type: UserItem['type']) => boolean;
}

const USERNAME_KEY = "username_key"; // keys for fetching values from localStorage, names r lowkey arbitrary
const FAVORITES_KEY = "favorites_key";
const CART_KEY = "cart_key";
const GENRES_KEY = "genres_key";

function load<Type>(key: string, backup: Type): Type { // to load any type from localStorage
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

// export const UserContext = createContext<UserContextType | undefined>(undefined); // this is global and lets the entire site use the info.

//     return (
//         <div>

//         </div>
//     );
