import { Artist } from './artist.model';
import { Album } from './album.model';
import { Track } from './track.model';
import { PagedResponse } from './paged-response.model';

export interface SearchResponse {
  artists: PagedResponse<Artist>;
  albums?: PagedResponse<Album>;
  tracks?: PagedResponse<Track>;
} 