import { PartOfFilm } from "../../models/entities";
import { ShortPage } from "../../services/DataProvider";
import { ElementProps, WithDataProps } from "./WithData";
import { EntityDetailsWithFilms } from "./EntityDetails";

export interface Data<T> {
  loading?: boolean;
  value?: T;
  error?: Error;
}

export interface RoutePageProps {
  page?: string;
}

export interface RouteEntityProps {
  id?: string;
}

export const displayNumber = (num: number | undefined, stringOnZero?: string): string => {
  if (Number.isNaN(num)) return "Unknown";
  if (num === undefined) return "Not provided";
  if (num === 0 && stringOnZero !== undefined) return stringOnZero;
  return num.toString();
};

export const validatePage = (page: number): boolean => !(Number.isNaN(page) || !Number.isInteger(page) || page < 1)

export const pageToNumber = (page?: string): number => page ? Number(page) : 1;

export type WithDataListProps = WithDataProps<ShortPage, ElementProps>;

export type WithDataDetailsProps<T extends PartOfFilm> = WithDataProps<EntityDetailsWithFilms<T>, ElementProps>;
