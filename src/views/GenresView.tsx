import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { MOVIE_DISCOVER_ENDPOINT, MOVIE_GENRES, TV_DISCOVER_ENDPOINT, TV_GENRES } from '@/core/constants';
import type { MoviesResponse, TvsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const GenresView = () => {
  const { type, genre_id } = useParams();
  const genreList = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';

  const { data } = useTmdb<MoviesResponse | TvsResponse>(
    `${type === 'movie' ? MOVIE_DISCOVER_ENDPOINT : TV_DISCOVER_ENDPOINT}`,
    { page, with_genres: Number(genre_id) },
    [page, interval, type, genre_id]
  );
  console.log('hi', { MOVIE_DISCOVER_ENDPOINT });

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: ('original_title' in result ? result.original_title : result.name) ?? 'Untitled',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5 mb-14">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Now Playing</h1>
        <ButtonGroup
          value={type}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
          onClick={(value) => {
            setPage(1); // resets page when switching
            navigate(type === 'tv' ? `/genres/${value}/28` : `/genres/${value}/10759`);
          }}
        />
      </div>

      <div className="flex">
        {genreList.map((g) => (
          <Link
            className="px-6 py-3 rounded-md transition-all duration-200 bg-zinc-800 text-white-900 m-1 hover:bg-zinc-900"
            key={g.id}
            to={`/genres/${type}/${g.id}`}
          >
            {g.label}
          </Link>
        ))}
      </div>

      <ImageGrid results={gridData} onClick={(id) => navigate(type === 'movie' ? `/movie/${id}/credits` : `/tv/id/${id}/seasons`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};