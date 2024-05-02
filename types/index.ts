import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  title: string;
  btnType?: 'button' | 'submit';
  containerStyles?: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface HeroProps {
  id: number;
  name: string;
  homeworld: number;
  films: number[];
  starships: number[];
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface HeroHomeworldProps {
  [id: number]: string;
}

export interface FilmProps {
  id: number;
  title: string;
  episode_id: number;
  release_date: string;
  starships: number[];
}

export interface FilmAndStarshipsProps {
  [filmId: string]: number[];
}

export interface StarshipProps {
  id: number;
  name: string;
  starship_class: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
}

export interface HeroesListProps {
  heroes: HeroProps[];
  homeworlds: HeroHomeworldProps;
  totalPages: number;
  allFilms: FilmProps[];
  allStarships: StarshipProps[];
}

export interface HeroCardProps {
  hero: HeroProps;
  planet: string;
  allFilms: FilmProps[];
  allStarships: StarshipProps[];
}

export interface HeroDetailsProps {
  hero: HeroProps;
  homeworld: string;
  allFilms: FilmProps[];
  allStarships: StarshipProps[];
  isModalOpen: boolean;
  closeModal: () => void;
}

export interface getNodesAndEdgesProps {
  hero: HeroProps;
  homeworld: string;
  heroStarshipsPerFilm: FilmAndStarshipsProps[];
  allStarships: StarshipProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
