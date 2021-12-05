import * as React from "react";
import { useParams } from "react-router-dom";
import { ShortPage } from "../../services/DataProvider";
import { pageToNumber, RouteEntityProps, RoutePageProps, validatePage, WithDataListProps } from "./utils";

export const useRoutePage = (): { page?: number; error?: Error } => {
  const { page } = useParams<RoutePageProps>();
  const pageNumber = pageToNumber(page);
  if (validatePage(pageNumber)) return { page: pageNumber };
  else return { error: new Error(`Invalid page parameter ${page}`) };
};

export const useRouteId = (): { id?: string; error?: Error } => {
  const { id } = useParams<RouteEntityProps>();
  if (id) return { id };
  else return { error: new Error(`Invalid id parameter ${id}`) };
};

export const loadPageController = (fetcher: (page?: number) => Promise<ShortPage>, props: WithDataListProps) => {
  const { page, error } = useRoutePage();
  const { data, isLoading, onData, onError, onLoading, isError } = props;

  React.useEffect(() => {
    if (!isError) {
      if (error) onError(`Invalid page parameter ${page}`);
      else if ((!data && !isLoading) || (data && data.page !== page)) {
        onLoading();
        fetcher(page).then(onData).catch(onError);
      }
    }
  }, [page, error, props, fetcher]);
};
