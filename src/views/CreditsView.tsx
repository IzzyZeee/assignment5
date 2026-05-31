import { ImageGrid } from '@/components';
import { TV_ENDPOINT, MOVIE_ENDPOINT } from '@/core/constants';
import type { CreditsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

type Props = { // lets us use it for both movie AND tv
  kind: "movie" | "tv"; 
};

export const CreditsView = ({ kind }: Props) => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  if (kind === "movie") { 
  
    const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, []);

    const gridData = (data?.cast ?? []).map((result) => ({
      id: result.id,
      imagePath: result.profile_path,
      primaryText: result.name,
      secondaryText: result.character,
    }));

    if (!data) {
      return <p className="text-center text-gray-400">Could not load credits.</p>;
    }

    return (
      <section className="px-2">
        <h2 className="text-2xl font-bold mb-6">Credits</h2>
        {data.cast.length ? <ImageGrid results={gridData} onClick={(id) => navigate(`/person/${id}`)}/> : <p className="text-gray-400 text-center">No credits available.</p>}
      </section>
    );

  } else { // "tv"

    const { data } = useTmdb<CreditsResponse>(`${TV_ENDPOINT}/${id}/credits`, {}, []);

    const gridData = (data?.cast ?? []).map((result) => ({
      id: result.id,
      imagePath: result.profile_path,
      primaryText: result.name,
      secondaryText: result.character,
    }));

    if (!data) {
      return <p className="text-center text-gray-400">Could not load credits.</p>;
    }

    return (
      <section className="px-2">
        <h2 className="text-2xl font-bold mb-6">Credits</h2>
        {data.cast.length ? <ImageGrid results={gridData} onClick={(id) => navigate(`/person/${id}`)}/> : <p className="text-gray-400 text-center">No credits available.</p>}
      </section>
    )
  }
};
