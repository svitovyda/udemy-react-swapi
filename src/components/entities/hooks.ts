import * as React from "react";
import { useParams } from "react-router-dom";
import { ShortPage } from "../../services/DataProvider";
import {
  pageToNumber,
  RouteEntityProps as RouteEntityProperties,
  RoutePageProps as RoutePageProperties,
  validatePage,
  WithDataListProps as WithDataListProperties
} from "./utils";

export const useRoutePage = (): { page?: number; error?: Error } => {
  const { page } = useParams<RoutePageProperties>();
  const pageNumber = pageToNumber(page);
  return validatePage(pageNumber) ? { page: pageNumber } : { error: new Error(`Invalid page parameter ${page}`) };
};

export const useRouteId = (): { id?: string; error?: Error } => {
  const { id } = useParams<RouteEntityProperties>();
  return id ? { id } : { error: new Error(`Invalid id parameter ${id}`) };
};

export const loadPageController = (
  fetcher: (page?: number) => Promise<ShortPage>,
  properties: WithDataListProperties
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { page, error } = useRoutePage();
  const { data, isLoading, onData, onError, onLoading, isError } = properties;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (!isError) {
      if (error) {
        onError(`Invalid page parameter ${page}`);
      } else if ((!data && !isLoading) || (data && data.page !== page)) {
        onLoading();
        fetcher(page).then(onData).catch(onError);
      }
    }
  }, [page, error, properties, fetcher, data, isError, isLoading, onData, onError, onLoading]);
};
