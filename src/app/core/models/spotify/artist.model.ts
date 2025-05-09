import { Image } from './image.model';

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