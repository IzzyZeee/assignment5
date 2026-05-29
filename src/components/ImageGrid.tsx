import { IMAGE_BASE_URL } from '@/core/constants';
import { FaHeart } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
    priceText?: string;
  }>;
  onClick?: (id: number) => void;
  onFavorite?: (id: number) => void;
  onCart?: (id: number) => void;
  isFavorite?: (id: number) => boolean;
  isCart?: (id: number) => boolean;
};

export const ImageGrid = ({ results, onClick, onFavorite, onCart, isFavorite, isCart }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-5">
      {results.map((result) => (
        <div
          key={result.id}
          className="block bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          onClick={() => onClick?.(result.id)}
        >
          <div className="absolute"> 
            {onFavorite && (
              <button
                type="button"
                className=""
                onClick={(event) => {
                  event.stopPropagation();
                  onFavorite(result.id);
                }}
              >
                <FaHeart />
              </button>
            )}
            {onCart && (
              <button
                type="button"
                className=""
                onClick={(event) => {
                  event.stopPropagation();
                  onCart(result.id);
                }}
              >
                <IoCart />
              </button>
            )}
          </div>

          <div className="relative">
            <img className="w-full h-[280px] object-cover" src={`${IMAGE_BASE_URL}${result.imagePath}`} alt={result.primaryText} />
            {result.priceText && <div className="">{result.priceText}</div>}
          </div>
          
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};