import { MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core/constants";
import type { MovieResponse, TvResponse } from "@/core/types";
import { useTmdb } from "@/hooks";
import { useParams } from "react-router-dom";

type Props = { // lets us use it for both movie AND tv
  kind: "movie" | "tv"; 
};

export const TrailersView = ({ kind }: Props) => {
  
  const { id } = useParams();

  if (kind === "movie") {
    const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, []);

    if (!data) {
      return <p className="text-center text-gray-400">Loading...</p>;
    }

    const trailerVideos = data?.videos?.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer') ?? [];

    return (
      <div>
        {trailerVideos.length ? ( // If any items exist in the array of videos
          <ul>
            {trailerVideos.map((v) => (
              <li className="space-y-10">
                <p className="text-xl mt-10">{v.name}</p>
                  <div>
                    <iframe
                      className="aspect-video max-w-3xl h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${v.key}`}
                      title="Movie Trailer"
                      allowFullScreen
                    />
                  </div>
              </li>
            ))}  
          </ul>
        ) : ( // No videos in array
          <p className="text-center text-gray-400">No trailers available.</p>
        )}
      </div>
    );

  } else { // tv

    const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${id}`, { append_to_response: 'videos'}, []);

    if (!data) {
      return <p className="text-center text-gray-400">Loading...</p>;
    }

    const trailerVideos = data?.videos?.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer') ?? [];

    return (
      <div>
        {trailerVideos.length ? ( // If any items exist in the array of videos
          <ul>
            {trailerVideos.map((v) => (
              <li className="space-y-10">
                <p className="text-xl mt-10">{v.name}</p>
                  <div>
                    <iframe
                      className="aspect-video max-w-3xl h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${v.key}`}
                      title="Movie Trailer"
                      allowFullScreen
                    />
                  </div>
              </li>
            ))}  
          </ul>
        ) : ( // No videos in array
          <p className="text-center text-gray-400">No trailers available.</p>
        )}
      </div>
    );
  }
};
