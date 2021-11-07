import { Film, PartOfFilm } from "../../models/entities";

export type Data<T> = "error" | "loading" | T;

export interface EntityShort {
  id: string;
  name: string;
  films: string[];
}

export const getAllFilms = async (entity: PartOfFilm, filmFetcher: (id: string) => Promise<Film>): Promise<string[]> =>
  (await Promise.all(entity.films.map((f) => filmFetcher(f).then((f) => f.name)))).filter((f) => !!f);

export const entityToShort =
  (filmFetcher: (id: string) => Promise<Film>) =>
  async (entity: PartOfFilm): Promise<EntityShort> =>
    getAllFilms(entity, filmFetcher).then((films) => ({
      id: entity.id,
      name: entity.name,
      films
    }));

export const displayNumber = (num: number | undefined, stringOnZero?: string): string => {
  if (Number.isNaN(num)) return "Unknown";
  if (num === undefined) return "Not provided";
  if (num === 0 && stringOnZero !== undefined) return stringOnZero;
  return num.toString();
};
