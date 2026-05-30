import { Button, LinkGroup, Modal } from '@/components';
import { useUserContext } from '@/context';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { MovieResponse } from '@/core/types';
import { getYear } from '@/functions/PriceCalculator';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Could not find content.</p>;
  }

  const { moviePreferences, tvPreferences, isCart, addCart } = useUserContext();
  
  const movieItem = {
    id: data.id,
    type: 'movie' as const,
    title: data.title,
    imagePath: data.poster_path,
    release: getYear(data.release_date),
  }

  // function addCart(): void {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.title} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.release_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            
            <Button 
              onClick={() => addCart(movieItem)}
              variant={isCart(data.id, 'movie') ? 'primary' : 'grey'}
            >
              <IoCart />
            </Button>

            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Trailers', to: 'trailers' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
