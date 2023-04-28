import { PartOfFilm } from "../../models/entities";
import { ShortPage } from "../../services/DataProvider";
import { EntityDetailsWithFilms } from "./EntityDetails";
import { ElementProps as ElementProperties, WithDataProps as WithDataProperties } from "./WithData";

export interface Data<T> {
  loading?: boolean;
  value?: T;
  error?: Error;
}

export interface RoutePageProperties {
  page?: string;
}

export interface RouteEntityProperties {
  id?: string;
}

export const displayNumber = (number_: number | undefined, stringOnZero?: string): string => {
  if (Number.isNaN(number_)) return "Unknown";
  if (number_ === undefined) return "Not provided";
  if (number_ === 0 && stringOnZero !== undefined) return stringOnZero;
  return number_.toString();
};

export const validatePage = (page: number): boolean => !(Number.isNaN(page) || !Number.isInteger(page) || page < 1);

export const pageToNumber = (page?: string): number => (page ? Number(page) : 1);

export type WithDataListProps = WithDataProperties<ShortPage, ElementProperties>;

export type WithDataDetailsProps<T extends PartOfFilm> = WithDataProperties<
  EntityDetailsWithFilms<T>,
  ElementProperties
>;
