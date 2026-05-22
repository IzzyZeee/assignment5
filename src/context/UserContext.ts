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

const USERNAME_KEY = "username_key";
const FAVORITES_KEY = "favorites_key";
const CART_KEY = "cart_key";
const GENRES_KEY = "genres_key";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContext = () => {



    return (
        <div>

        </div>
    );
}