import { Button, ImageGrid, Pagination } from "@/components";
import type { TvsResponse } from "@/core/types";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const LABELS: Record<string, string> = { // TMDB's 4 tv categories
    airing_today: 'Airing Today', // key (from url) : text displayed in button
    on_the_air: 'On The Air',
    popular: 'Popular',
    top_rated: 'Top Rated'
}

function tvListUrl(listKey: string) { // Uses listKey to get working URL to get valid link from TMDB
    return `https://api.themoviedb.org/3/tv/${listKey}`;
}

export const TelevisionCategoriesView = () => {

    const { listKey } = useParams(); // To get whatever listKey is from router
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // To get the page you're on - default, begins at 1 (for Pagination below)
    const valid = listKey && listKey in LABELS; // Validity check, listKey mustn't be blank + be in LABELS

    const url = tvListUrl(listKey!); // Uses function above (! ensures it's valid)
    const { data } = useTmdb<TvsResponse>(url, { page }, [url, page]); // Get data from TMDB

    if (!data || !valid) { // If the data doesn't exist (fake loading screen lol)
        return (
            <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Trying to fetch data...</h1>
                <Button onClick={() => navigate(-1)}>
                    <div className="flex items-center">
                        <FaArrowLeft className="mr-2"/>Back
                    </div>
                </Button>
            </main>
        )
    }

    const gridData = data.results.map((result) => ({ // Map will go through every item in the array
        id: result.id,
        imagePath: result.poster_path,
        primaryText: result.name ?? 'Untitled',
    }));

    return (
        <div className="p-10">
            <Outlet />
                <ImageGrid results={gridData} onClick={(id) => navigate(`/tv/id/${id}/seasons`)} /> {/* ImageGrid already defined for us */}
                <div className="p-10">
                    <Pagination page={page} maxPages={data.total_pages} onClick={setPage} /> {/* Pagination already defined for us */}
                </div>
        </div>
    );
}