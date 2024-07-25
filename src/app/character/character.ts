export type Character = {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
    series: Comics;
    stories: Stories;
    events: Comics;
    urls: URL[];
  };
  
  export type Comics = {
    available: number;
    collectionURI: string;
    items: ComicsItem[];
    returned: number;
  };
  
  export type ComicsItem = {
    resourceURI: string;
    name: string;
  };
  
  export type Stories = {
    available: number;
    collectionURI: string;
    items: StoriesItem[];
    returned: number;
  };
  
  export type StoriesItem = {
    resourceURI: string;
    name: string;
    type: Type;
  };
  
  export enum Type {
    Cover = 'cover',
    InteriorStory = 'interiorStory',
  }
  
  export type Thumbnail = {
    path: string;
    extension: string;
  };
  
  export type URL = {
    type: string;
    url: string;
  };
  