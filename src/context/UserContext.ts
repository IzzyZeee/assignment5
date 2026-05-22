import { createContext } from "react";

export type UserItem = { // per item that'll be stored in favorites/cart (a movie, a tv show, a tv season)
    type: 'movie' | 'tv' | 'season';
    id: number;
    title: string;
    release: number; // year of release
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
    removeFavorite: (item: UserItem) => void;
    removeCart: (item: UserItem) => void;
    isFavorite: (id: number, type: UserItem['type']) => boolean; // UserItem['variableInUserItemWithThisName']
    isInCart: (id: number, type: UserItem['type']) => boolean; // must have id AND type cuz movies and tv can hv the same id
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContext = () => {



    return (
        <div>

        </div>
    );
}