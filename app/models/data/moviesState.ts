interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null; // Use `null` if it's always null; otherwise, define a type if it can be an object
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string; // Consider using Date if you parse it
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string; // Could be a union type if statuses are known (e.g., "Released" | "Post Production")
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface IMovieCredits {
  id: number;
  cast: ICast[];
}

interface ICastDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

interface IMovieCreditCast extends IMovie {
  character: string;
  credit_id: string;
  order: number;
}

interface IMovieCreditCrew extends IMovie {
  credit_id: string;
  department: string;
  job: string;
}

interface IPersonMovieCredits {
  cast: IMovieCreditCast[];
  crew: IMovieCreditCrew[];
  id: number;
}

interface IMoviesState {
  isLoading: boolean;
  error: null | string;
  movies: {
    page: number | null;
    results: IMovie[];
    total_pages: number | null;
    total_results: number | null;
  };
}

interface IMovieDetailState {
  isLoading: boolean;
  error: null | string;
  movie: IMovieDetail | null;
}

interface IMovieCreditsState {
  isLoading: boolean;
  error: null | string;
  cast: {
    id: number;
    cast: ICast[];
  };
}

interface ICastDetailState {
  isLoading: boolean;
  error: null | string;
  cast: ICastDetail | null;
}

interface IPersonMovieCreditsState {
  isLoading: boolean;
  error: null | string;
  movies: IPersonMovieCredits;
}

export type {
  IMoviesState,
  IMovie,
  IMovieDetailState,
  IMovieDetail,
  IMovieCredits,
  IMovieCreditsState,
  ICast,
  ICastDetail,
  ICastDetailState,
  IPersonMovieCredits,
  IPersonMovieCreditsState,
};
