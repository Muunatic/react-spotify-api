export interface dataInterface {
  timestamp: number;
  context: null;
  progress_ms: number;
  item: {
    album: albumData;
    artists: artistsData[];
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  },
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    }
  }
  is_playing: boolean;
}

interface albumData {
  artists: albumArtistData[];
  external_urls: {
    spotify: string;
  }
  href: string;
  id: string;
  images: albumImageData[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface albumArtistData {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface albumImageData {
  height: number;
  url: string;
  width: number;
}

interface artistsData {
  external_urls: {
    spotify: string;
  }
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
