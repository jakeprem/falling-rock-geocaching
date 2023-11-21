export type Cache = {
  id: string;
  name: string;
  description: string;
  hint: string;
  location: string;
  latitude: string;
  longitude: string;
};

export type ParsedCache = {
  Cache: string;
  Rating: string;
  Type: string;
  "Container type": string;
  Latitude: number;
  Longitude: number;
  Hint: string;
  Location: string;
  Notes: string;
  link: string;
  walkingLink: string;
  Hidden: boolean;
};

export type RawCache = {
  Cache: string;
  Rating: string;
  Type: string;
  "Container type": string;
  Latitude: string;
  Longitude: string;
  Hint: string;
  Location: string;
  Notes: string;
  Hidden: string;
};
