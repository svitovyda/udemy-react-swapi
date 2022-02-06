import React from "react";
import { Data } from "./utils";
import { WithLoaderAndError } from "../general/WithLoaderAndError";

export type ElementProps = React.HTMLAttributes<HTMLElement>;

export type WithDataProps<T, P extends ElementProps> = P & {
  onData: (data: T) => void;
  onError: (error: string | Error) => void;
  onLoading: () => void;
  data?: T;
  isLoading: boolean;
  isError: boolean;
};

export const withData: <T, P extends ElementProps>(
  BaseComponent: React.FC<WithDataProps<T, P>>
) => React.FC<P> =
  <T, P extends ElementProps>(BaseComponent: React.FC<WithDataProps<T, P>>) =>
    (props: P) => {
      const [data, setData] = React.useState<Data<T>>({});

      const onData = React.useCallback((newData: T) => {
        if (newData !== data) {
          setData({ value: newData });
        }
      }, [setData, data]);

      const onError = React.useCallback(
        (error: string | Error) => {
          if (typeof error === "string") setData({ error: new Error(error) });
          else setData({ error });
        },
        [setData]
      );

      const onLoading = React.useCallback(() => {
        setData({ loading: true })
      }, [setData]);

      return (
        <>
          <BaseComponent
            {...props}
            data={data.value}
            onData={onData}
            onError={onError}
            onLoading={onLoading}
            isLoading={data.loading === true}
            isError={data.error !== undefined}
          />
          <WithLoaderAndError error={data.error} loading={data.loading} />
        </>
      );
    };
