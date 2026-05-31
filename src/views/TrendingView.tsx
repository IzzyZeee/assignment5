import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { useUserContext, type UserItem } from '@/context';
import { MOVIE_TRENDING_ENDPOINT, TV_TRENDING_ENDPOINT } from '@/core/constants';
import type { MoviesResponse, TvsResponse } from '@/core/types';
import { calculatePrice, getDisplayPrice, getYear } from '@/functions/PriceCalculator';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const { favorites, addFavorite, addCart, removeFavorite, removeCart, isFavorite, isCart } = useUserContext();

  const [kind, setKind] = useState<'movie' | 'tv'>('movie'); // determine if it's movie or tv
  const { data } = useTmdb<MoviesResponse | TvsResponse>(
    `${kind === 'movie' ? MOVIE_TRENDING_ENDPOINT : TV_TRENDING_ENDPOINT}/${interval}`,
    { page },
    [page, interval, kind]
  );
  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: ('original_title' in result ? result.original_title : result.name) ?? 'Untitled',
    priceText: kind === 'movie' && 'release_date' in result ? getDisplayPrice(calculatePrice(getYear(result.release_date))) : undefined,
  }));

  function findMovie(id: number): UserItem | undefined {
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

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5 mb-14">
      <div className="flex items-center justify-between mb-4">
        <ButtonGroup
          value={kind}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
          onClick={(value) => {
            setKind(value as 'movie' | 'tv');
            setPage(1); // resets page when switching
          }}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <ImageGrid 
        results={gridData} 
        onClick={(id) => navigate(kind === 'movie'? `/movie/${id}/credits` : `/tv/id/${id}/seasons`)} 
        onFavorite={
          kind === 'movie' ? (id) => {
            const movie = findMovie(id);
            if (movie) addFavorite(movie);
          } : undefined
        }
        isFavorite={kind === 'movie' ? (id) => isFavorite(id, 'movie') : undefined}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};