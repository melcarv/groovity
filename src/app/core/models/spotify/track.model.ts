import { Artist } from './artist.model';
import { Album } from './album.model';

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