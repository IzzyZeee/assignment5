import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, TV_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Could not find content.</p>;
  }

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
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.name} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.first_air_date}
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              {data.number_of_seasons} Seasons - {data.number_of_episodes} Episodes, Status: <span className="font-bold">{data.status}</span>
            </p>
            <p className="text-gray-300">{data.overview}</p>
            
            <LinkGroup
              options={[
                { label: 'Seasons', to: 'seasons' },
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
