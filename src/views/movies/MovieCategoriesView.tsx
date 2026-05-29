import { Button, ImageGrid, Pagination } from "@/components";
import { useUserContext, type UserItem } from "@/context";
import type { MoviesResponse } from "@/core/types";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const LABELS: Record<string, string> = { // TMDB's 4 movie categories
    now_playing: 'Now Playing', // key (from url) : text displayed in button
    popular: 'Popular',
    upcoming: 'Upcoming',
    top_rated: 'Top Rated'
}

function movieListUrl(listKey: string) { // Uses listKey to get working URL to get valid link from TMDB
    return `https://api.themoviedb.org/3/movie/${listKey}`;
}

export const MovieCategoriesView = () => {

    const { favorites, addFavorite, addCart, removeFavorite, removeCart, isFavorite, isCart } = useUserContext();

    const { listKey } = useParams(); // To get whatever listKey is from router
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // To get the page you're on - default, begins at 1 (for Pagination below)
    const valid = listKey && listKey in LABELS; // Validity check, listKey mustn't be blank + be in LABELS

    if (!valid) { // If the listKey doesn't exist (fake loading screen lol)

    return (
            <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold">Trying to fetch data...</h1>
                <Button onClick={() => navigate(-1)}>
                    <div className="flex items-center">
                        <FaArrowLeft className="mr-2"/>Back
                    </div>  
                </Button>
            </main>
        )
    }

    const url = movieListUrl(listKey!); // Uses function above (! ensures it's valid)
    const { data } = useTmdb<MoviesResponse>(url, { page }, [url, page]); // Get data from TMDB

    if (!data) { // If the data doesn't exist (fake loading screen lol)

    return (
            <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold">Trying to fetch data...</h1>
                <Button onClick={() => navigate(-1)}>
                    <div className="flex items-center">
                        <FaArrowLeft className="mr-2"/>Back
                    </div>
                </Button>
            </main>
        )
    }

    const movieResults = data.results;

    const gridData = movieResults.map((result) => ({ // Map will go through every item in the array (each movie)
        id: result.id,
        imagePath: result.poster_path,
        primaryText: result.original_title ?? 'Untitled',
    }));

    function findMovie(id: number): UserItem | undefined {
        const movie = movieResults.find((result) => result.id === id);


    }

    return (
        <div className="p-10">
            <Outlet />
            <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}`)} 
                onFavorite={(id) => {
                    if (isFavorite(id, 'movie')) {
                        removeFavorite(id, 'movie');
                        return;
                    }

                    const movie = findMovie(id);
                    if (movie) {
                        addFavorite(movie);
                    }



                }}      
                
                
                
                
                
            /> {/* ImageGrid already defined for us */}
            <div className="p-10">
                <Pagination page={page} maxPages={data.total_pages} onClick={setPage} /> {/* Pagination already defined for us */}
            </div>
        </div>
    );
}