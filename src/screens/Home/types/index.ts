interface IStarwarsData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: URL[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: URL;
};

export interface IStarwarsResponse {
  count: number;
  next: URL;
  previous: URL;
  results: IStarwarsData[];
};
