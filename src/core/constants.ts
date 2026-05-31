// export const API_KEY = '5f050143489ff91d616bca9c0e0f8083'; No longer hard-coded

export const ORIGINAL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/movie';
export const MOVIE_NOW_PLAYING_ENDPOINT = 'https://api.themoviedb.org/3/movie/now_playing';
export const MOVIE_TRENDING_ENDPOINT = 'https://api.themoviedb.org/3/trending/movie';
export const MOVIE_DISCOVER_ENDPOINT = 'https://api.themoviedb.org/3/discover/movie';

export const TV_ENDPOINT = 'https://api.themoviedb.org/3/tv';
export const TV_NOW_PLAYING_ENDPOINT = 'https://api.themoviedb.org/3/tv/now_playing';
export const TV_TRENDING_ENDPOINT = 'https://api.themoviedb.org/3/trending/tv';
export const TV_DISCOVER_ENDPOINT = 'https://api.themoviedb.org/3/discover/tv';

export const MULTISEARCH_ENDPOINT = 'https://api.themoviedb.org/3/search/multi';
export const SEARCH_MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';
export const SEARCH_TV_ENDPOINT = 'https://api.themoviedb.org/3/search/tv';
export const SEARCH_PERSON_ENDPOINT = 'https://api.themoviedb.org/3/search/person';

export const GITHUB_LINK = 'https://github.com/IzzyZeee/assignment4.git';

export const MOVIE_GENRES: Array<{ label: string; id: number }> = [
    { label: 'Action', id: 28 },
    { label: 'Adventure', id: 12 },
    { label: 'Animation', id: 16 },
    { label: 'Crime', id: 80 },
    { label: 'Family', id: 10751 },
    { label: 'Fantasy', id: 14 },
    { label: 'History', id: 36 },
    { label: 'Horror', id: 27 },
    { label: 'Mystery', id: 9648 },
    { label: 'Scifi', id: 878 },
];

export const TV_GENRES: Array<{ label: string; id: number }> = [
    { label: 'Action', id: 10759 },
    { label: 'Animation', id: 16 },
    { label: 'Comedy', id: 35 },
    { label: 'Crime', id: 80 },
    { label: 'Documentary', id: 99 },
    { label: 'Drama', id: 18 },
    { label: 'Family', id: 10751 },
    { label: 'Kids', id: 10762 },
    { label: 'Mystery', id: 9648 },
    { label: 'Scifi', id: 10765 },
];

