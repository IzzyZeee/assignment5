import { ImageGrid, Pagination, SearchBar } from '@/components';
import { useUserContext, type UserContextType, type UserItem } from '@/context';
import { MULTISEARCH_ENDPOINT } from '@/core/constants';
import type { MultiSearchResponse } from '@/core/types';
import { calculatePrice, getDisplayPrice, getYear } from '@/functions/PriceCalculator';
import { useDebounce, useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryFromUrl = searchParams.get('q') ?? '';
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const type = searchParams.get('type');

  const { addFavorite, removeFavorite, isFavorite } = useUserContext();

  useEffect(() => {
    setPage(1);
  }, [queryFromUrl, type]);

  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const { data } = useTmdb<MultiSearchResponse>(MULTISEARCH_ENDPOINT, { query: queryFromUrl, page }, [queryFromUrl, page]);
  const results = (data?.results ?? []).filter((result) => result.media_type === type); // to filter all data ONLY type of selected button

  const gridData = (results).map((result) => ({
    id: result.id,
    imagePath: (result.media_type === 'person' ? result.profile_path ?? null : result.poster_path ?? null),
    primaryText: result.title,
    secondaryText: result.media_type,
    priceText: result.media_type === 'movie' && result.release_date ? getDisplayPrice(calculatePrice(getYear(result.release_date))) : '',
  }));

  function findMovie(id: number): UserItem | undefined { 
    const movieById = results.find((item) => item.id === id && item.media_type === 'movie');
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
    <section className="max-w-[1200px] mx-auto p-10 space-y-5">
      <h1>Search for: <span className="font-bold">{queryFromUrl}</span></h1>
      <ImageGrid 
        results={gridData} 
        onClick={(id) => navigate(type === 'movie' ? `/movie/${id}/credits` : type === 'tv' ? `/tv/id/${id}/seasons` : `/person/${id}`)}
        onFavorite={
          type === 'movie' ? (id) => {
            const movieById = findMovie(id);
            if (movieById) {
              addFavorite(movieById);
            }
          } : undefined
        }
        isFavorite={type === 'movie' ? (id) => isFavorite(id, 'movie') : undefined}
      />
      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found</p>
      )}
    </section>
  );
};