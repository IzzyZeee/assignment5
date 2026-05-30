export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
    title?: string;
    first_air_ate?: string;
    release_date?: string;
  }>;
  total_pages: number;
};

export type TvsResponse = {
  results: Array<{
    id: number;
    name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type MovieResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  genre_ids?: {
    genre_results: Array<{
      id: number;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type TvResponse = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genre_ids?: {
    genre_results: Array<{
      id: number;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    poster_path: string | null;
    character: string;
  }>;
};

export type SeasonsResponse = {
  seasons: Array<{
    id: number;
    name: string;
    poster_path: string | null;
    air_date: string;
    season_number: number;
  }>;
};

export type SeasonResponse = {
  name: string
  id: number;
  air_date: string;
  overview: string;
  episodes: Array<{
    id: number;
    name: string;
    air_date: string;
    still_path: string;
  }>;
};

export type GenresResponse = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};


export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type MultiSearchResponse = {
  results: Array<{
    id: number;
    name: string;
    media_type: string;
    title?: string;
    original_title?: string;
    first_air_ate?: string;
    release_date?: string;
    profile_path: string | null;
    poster_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};

export type PersonResponse = {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string;
  place_of_birth: string;
  birthday: string;
  overview: string;
  biography: string;
  results: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  
};

export type ImagesResponse = {
  profiles: Array<{
    id: number;
    name: string;
    file_path: string | null;
    character: string;
  }>;
};
