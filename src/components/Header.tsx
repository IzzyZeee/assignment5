import { Button, Link, SearchBar } from '@/components';
import { useUserContext } from '@/context';
import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";

type SearchKind = 'movie' | 'tv' | 'person';

export const Header = () => {

  const { username, favorites } = useUserContext();
  
  const navigate = useNavigate();
  const location = useLocation(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState(''); // what is left in the search bar

  const onSearchPage = location.pathname === '/search'; // is the current link on search page? 
  const search = onSearchPage ? (searchParams.get('q') ?? '') : draft;
  const searchKind = searchParams.get('type'); // get type from url

  const useSearch = (value: string) => {
    if (onSearchPage) {
      setSearchParams(value.trim() ? { q: value } : {});
    } else {
      setDraft(value);
    }
  }

  const doSearch = () => {
    const source = (onSearchPage ? search : draft).trim(); // btw trim is a function that removes extra spaces at start/end
    navigate(source ? { pathname: '/search', search: `?q=${encodeURIComponent(source)}` } : { pathname: '/search' });
    if (!onSearchPage) {
      setDraft('');
    }
  }

  const changeSearchKind = (searchType) => { 
    const source = (onSearchPage ? search : draft).trim();
    navigate({pathname: '/search', search: `?type=${searchType}&q=${encodeURIComponent(source)}`}) 
  }

  return (
    <header>
      <nav className="items-center flex gap-4 p-4 bg-zinc-800">
        <div>
          <div className="mr-2">
            <h1 className="text-3xl font-bold text-teal-500">TMDB</h1>
            <h1 className="text-2xl font-bold text-white-900">Explorer</h1>
          </div>
        </div>

        <div>
          <div className="flex gap-4">
            <Link to="/movies/now_playing">Movies</Link>
            <Link to="/tv/airing_today">TV</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/genres/movie/28">Genre</Link>
            <Link to="/search">Search</Link>
          </div>

          <div className="flex gap-4 mt-4">
            <p className="text">Welcome, <span className="font-bold">{username}</span>!</p>
          </div>
        </div>
          
        <div className="ml-auto flex">
        <div className="flex gap-4 mr-6 mt-2 justify-end h-11">
          <Link to="/favorites">
            <FaHeart className="mt-1"/>
            {favorites.length > 0 &&
              <div className="relative inline-flex rounded-full p-1 bottom-10 left-6 bg-teal-600">
                <p className="text-xs">{favorites.length}</p>
              </div>
            }
          </Link>
          <Link to="/cart"><IoCart className="mt-1"/></Link>
          <Link to="/settings"><FaGear className="mt-1"/></Link>
        </div>
          <SearchBar value={search} onChange={useSearch} onSubmitSearch={doSearch} ></SearchBar>
          <div className="flex">
            <div className="m-2">
              <Button variant={searchKind === 'movie' ? 'primary' : 'grey'} onClick={() => changeSearchKind('movie')}>Movies</Button>
            </div>
            <div className="m-2">
              <Button variant={searchKind === 'tv' ? 'primary' : 'grey'} onClick={() => changeSearchKind('tv')}>TV</Button>
            </div>
            <div className="m-2">
              <Button variant={searchKind === 'person' ? 'primary' : 'grey'} onClick={() => changeSearchKind('person')}>People</Button>
            </div>
            
          </div>
        </div>
      </nav>
    </header>
  );
};