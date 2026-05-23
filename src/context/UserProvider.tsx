import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "@/context";
import { CART_KEY, FAVORITES_KEY, GENRES_KEY, load, USERNAME_KEY, type UserItem } from "./UserContext";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => { // stuff shared by the whole ahh website
    const [username, setUsername] = useState(() => load(USERNAME_KEY, 'NoUsername')); // using states to save the changeable things.
    const [favorites, setFavorites] = useState(() => load(FAVORITES_KEY, [])); // favorites is an array. initially empty
    const [cart, setCart] = useState(() => load(CART_KEY, []));
    const [genrePreferences, setGenrePreferences] = useState(() => load(GENRES_KEY, []));

    useEffect (() => { // useEffect to store stuff into localStorage, with respective deps
        localStorage.setItem(USERNAME_KEY, JSON.stringify(username)) // must be stringified to put in localStorage
    }, [username]) // only when username changes, trigger this useEffect

    useEffect (() => {  
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)) 
    }, [favorites]) 

    useEffect (() => {  
        localStorage.setItem(CART_KEY, JSON.stringify(cart)) 
    }, [cart]) 
    
    useEffect (() => {  
        localStorage.setItem(GENRES_KEY, JSON.stringify(genrePreferences)) 
    }, [genrePreferences]) 

    useEffect (() => { 
        localStorage.getItem()
    }, [])

    function addFavorite(item: UserItem) { // must remove item if in cart, then add to favorites.
        setCart()
        setFavorites()
    }

    return <UserContext.Provider value={undefined}>{children}</UserContext.Provider>;
};