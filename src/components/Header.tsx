import { Link, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';


export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState(''); // what is left in the search bar

  const onSearchPage = location.pathname === '/search'; // is the current link on search page? 
  const search = onSearchPage ? (searchParams.get('q') ?? '') : draft;

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

  return (
    <header>
      <nav className="items-center flex gap-4 p-4 bg-zinc-800">
        <div>
            <div className="mr-2">
              <h1 className="text-3xl font-bold text-teal-500">TMDB</h1>
              <h1 className="text-2xl font-bold text-white-900">Explorer</h1>
            </div>
          </div>
       
          <Link to="/movies/now_playing">Movies</Link>
          <Link to="/tv/airing_today">TV</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/genres/movie/28">Genre</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
          {/* <Link to="/cart">Search</Link>
          <Link to="/settings">Search</Link> */}

          <div className="ml-auto">
            <SearchBar value={search} onChange={useSearch} onSubmitSearch={doSearch} ></SearchBar>
          </div>
      </nav>
    </header>
  );
};