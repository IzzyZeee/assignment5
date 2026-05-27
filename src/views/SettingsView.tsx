import { useUserContext } from "@/context";
import { MOVIE_GENRES, TV_GENRES } from "@/core/constants";
import { useState } from "react";
import { Form } from "react-router-dom";

export const SettingsView = () => {
    
    const { username, setUsername, moviePreferences, setMoviePreferences, tvPreferences, setTvPreferences } = useUserContext();
    
    const movieGenres = MOVIE_GENRES.map((genre) => genre.id); // array with all genres
    const tvGenres = TV_GENRES.map((genre) => genre.id);

    const [draftUsername, setDraftUsername] = useState(username);

    function handleMovieChange(gId: number, checked: boolean) {
        setMoviePreferences((prev) => {
            if (checked) { // if checked
                return [...prev, gId];
            } else { // if not checked
                return prev.filter((id) => id !== gId);
            }
        })
    }

    function handleTvChange(gId: number, checked: boolean) {
        setTvPreferences((prev) => {
            if (checked) {
                return [...prev, gId];
            } else {
                return prev.filter((id) => id !== gId); 
            }
        })
    }

    return (
        <section className="max-w-[1000px] mx-auto p-6 space-y-6 mb-20">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            
            <div className="mx-auto p-6 space-y-6 mb-4 rounded-md bg-zinc-800 border border-zinc-700">
                <h1 className="font-bold text-xl">Edit Profile</h1>
                <div>
                    <h2>Username</h2>
                    <input 
                        className="mt-3 pl-2 w-100 h-10 rounded-md bg-zinc-900 border border-zinc-700 hover:bg-black"
                        value={draftUsername}
                        onChange={(e) => setDraftUsername(e.target.value)} 
                    />
                    <div className="mt-3 flex gap-4">
                        <button 
                            className="p-2 rounded-md bg-red-800 border border-red-500 hover:bg-red-500"
                            onClick={(e) => setDraftUsername(username)} 
                        >
                            Reset
                        </button>
                        <button 
                            className="p-2 rounded-md bg-teal-600 border border-teal-400 hover:bg-teal-400"
                            onClick={(e) => setUsername(draftUsername)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto p-6 space-y-6 rounded-md bg-zinc-800 border border-zinc-700">
                <h1 className="font-bold text-xl">Edit Genre Preferences</h1>
                <div className="flex gap-4">
                    <div className="mr-20">
                        <h1 className="flex gap-4 text-teal-500 font-bold">Movies</h1>
                        <ul>
                            {MOVIE_GENRES.map((genre) => (
                                <li key={genre.id}>
                                    <label className="flex gap-2 items-center">
                                        <input
                                            type="checkbox"
                                            checked={moviePreferences.includes(genre.id)}
                                            onChange={(e) =>
                                                handleMovieChange(
                                                    genre.id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        {genre.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className="flex gap-4 text-teal-500 font-bold">TV</h1>
                        <ul>
                            {TV_GENRES.map((genre) => (
                                <li key={genre.id}>
                                    <label className="flex gap-2 items-center">
                                        <input
                                            type="checkbox"
                                            checked={tvPreferences.includes(genre.id)}
                                            onChange={(e) =>
                                                handleTvChange(
                                                    genre.id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        {genre.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}