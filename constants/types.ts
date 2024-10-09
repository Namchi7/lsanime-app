export interface ResponseDataImagesType {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface ResponseDataTitlesType {
  type: string;
  title: string;
}

export interface ResponseDataAiredType {
  from: string;
  to: string;
  prop: {
    from: ResponseDataAiredPropType;
    to: ResponseDataAiredPropType;
    string: string;
  };
}

export interface ResponseDataAiredPropType {
  day: number;
  month: number;
  year: number;
}

export interface ResponseDataMalIdItemType {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeDetailsResponseDataType {
  mal_id: number;
  url: string;
  images: {
    jpg: ResponseDataImagesType;
    webp: ResponseDataImagesType;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  approved: boolean;
  titles: ResponseDataTitlesType[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: ResponseDataAiredType;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: ResponseDataMalIdItemType[];
  licensors: ResponseDataMalIdItemType[];
  studios: ResponseDataMalIdItemType[];
  genres: ResponseDataMalIdItemType[];
  explicit_genres: ResponseDataMalIdItemType[];
  themes: ResponseDataMalIdItemType[];
  demographics: ResponseDataMalIdItemType[];
}

export interface SeasonsResponsePaginationItemsType {
  count: number;
  total: number;
  per_page: number;
}

export interface ResponsePaginationType {
  last_visible_page: number;
  has_next_page: boolean;
  items?: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface SeasonsResponseType {
  data: AnimeDetailsResponseDataType[];
  pagination: ResponsePaginationType;
}

export interface HomePageDataType {
  thisSeason: SeasonsResponseType;
  upcoming: SeasonsResponseType;
  top: SeasonsResponseType;
}

export interface HomePageInitialDataType {
  isLoading: boolean;
  data: HomePageDataType | null;
  isError: boolean;
}

export type HomeListsItemKeyType = "thisSeason" | "upcoming" | "top";

export interface HomeListsItemType {
  key: HomeListsItemKeyType;
  title: string;
}

export interface ExploreResponseDataEntryType {
  mal_id: number;
  url: string;
  images: {
    jpg: ResponseDataImagesType;
    webp: ResponseDataImagesType;
  };
  title: string;
}

export interface ExploreResponseDataType {
  mal_id: string;
  entry: ExploreResponseDataEntryType[];
  content: string;
  user: {
    url: string;
    username: string;
  };
}

export interface ExploreResponseType {
  data: ExploreResponseDataType[];
  pagination: ResponsePaginationType;
}

export interface ExploreInitialDataType {
  isLoading: boolean;
  data: ExploreResponseType | null;
  isError: boolean;
}

export interface AnimeDetailsResponseType {
  data: AnimeDetailsResponseDataType;
}

export interface AnimeDetailsInitialDataType {
  isLoading: boolean;
  data: AnimeDetailsResponseDataType | null;
  isError: boolean;
}

export interface AnimeSearchResponseType {
  data: AnimeDetailsResponseDataType[];
  pagination: ResponsePaginationType;
}

export interface AnimeFilterResponseType {
  data: AnimeDetailsResponseDataType[];
  pagination: ResponsePaginationType;
}

export interface GenresType {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface filtersType {
  type: string;
  rating: string;
  startDate: number | null;
  endDate: number | null;
  minScore: number;
  status: string;
  orderBy: string;
  sortBy: string;
  genres: number[];
  page: number;
}

export interface filterDataOptionsType {
  name: string;
  value: string;
}

export interface filterDataRangeType {
  start: number;
  end: number | "today";
}

export interface filterDataType {
  title: string;
  set_to_key: string;
  type: string;
  options?: filterDataOptionsType[];
  range?: filterDataRangeType;
}
