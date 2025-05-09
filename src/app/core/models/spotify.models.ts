export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  genres?: string[];
  popularity?: number;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  followers?: {
    total: number;
    href: string | null;
  };
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
  album_type: 'album' | 'single' | 'compilation';
  artists: Artist[];
  release_date: string;
  total_tracks: number;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  tracks?: {
    items: Track[];
    total: number;
  };
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  track_number: number;
  artists: Artist[];
  album: Album;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface SearchResponse {
  artists: PagedResponse<Artist>;
  albums?: PagedResponse<Album>;
  tracks?: PagedResponse<Track>;
} 