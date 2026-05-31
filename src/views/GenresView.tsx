import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { MOVIE_DISCOVER_ENDPOINT, MOVIE_GENRES, TV_DISCOVER_ENDPOINT, TV_GENRES } from '@/core/constants';
import type { MoviesResponse, TvsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import {useUserContext, type UserItem} from '@/context';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { calculatePrice, getDisplayPrice, getYear } from '@/functions/PriceCalculator';

export const GenresView = () => {
  const { type, genre_id } = useParams();
  const genreList = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';

  const { favorites, addFavorite, addCart, removeFavorite, removeCart, isFavorite, isCart, moviePreferences, tvPreferences } = useUserContext();
  const preferences = type === 'movie' ? moviePreferences : tvPreferences;
  const filteredGenreList = genreList.filter((g) => preferences.includes(g.id));

  useEffect(() => {
    if (!type) return;

    if (filteredGenreList.length === 0) return;
    
    if (!preferences.includes(Number(genre_id))) {
      navigate(`/genres/${type}/${filteredGenreList[0].id}`, { replace: true });
      setPage(1);
    }
  }, [type, genre_id, preferences, filteredGenreList, navigate]);

  function findMovie(id: number) : UserItem | undefined {
    const movieById = data?.results.find((item) => item.id === id);
    if (!movieById) { 
      return undefined;
    }

    return {
        id: movieById?.id,
        type: 'movie',
        title: movieById?.title ?? movieById.original_title ?? "Untitled",
        imagePath: movieById.poster_path,
        release: getYear(movieById?.release_date),
      }
  }

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
    priceText: type === 'movie' && 'release_date' in result ? getDisplayPrice(calculatePrice(getYear(result.release_date))) : undefined,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5 mb-14">
      <div className="flex items-center justify-between mb-4">
        <ButtonGroup
          value={type}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
          onClick={(value) => {
            setPage(1); // resets page when switching
            const nextPrefs = value === 'movie' ? moviePreferences : tvPreferences;
            navigate(`/genres/${value}/${nextPrefs[0]}`);
          }}
        />
      </div>

      <div className="flex">
        {filteredGenreList.map((g) => (
          <Link
            className="px-6 py-3 rounded-md transition-all duration-200 bg-zinc-800 text-white-900 m-1 hover:bg-zinc-900"
            key={g.id}
            to={`/genres/${type}/${g.id}`}
          >
            {g.label}
          </Link>
        ))}
      </div>

      <ImageGrid 
        results={gridData} 
        onClick={(id) => navigate(type === 'movie' ? `/movie/${id}/credits` : `/tv/id/${id}/seasons`)} 
        onFavorite={
          type === 'movie' ? (id) => {
            addFavorite(findMovie(id));
          } : undefined
        }
        isFavorite={
          type === 'movie' ? (id) => isFavorite(id, 'movie') : undefined
        }
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};