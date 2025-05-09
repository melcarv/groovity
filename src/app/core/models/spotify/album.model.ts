import { Image } from './image.model';
import { Artist } from './artist.model';
import { Track } from './track.model';

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