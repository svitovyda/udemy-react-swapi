import React from "react";
import { Data } from "./utils";
import { DataProvider } from "../../services/DataProvider";
import { Config, ConfigService } from "../../services/ConfigService";
import { WithError } from "../general/WithError";
import { WithLoader } from "../general/withLoader";

export type ElementProps = React.HTMLAttributes<HTMLElement>;

export type WithDataProps<T, P extends ElementProps> = P & {
  dataProvider: DataProvider;
  settings: Config;
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
      const config = React.useRef(ConfigService.getConfig());
      const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);

      React.useEffect(() => {
        if (dataProvider === undefined) {
          DataProvider.getInstance().then(setDataProvider);
        }
      }, [config, dataProvider, setDataProvider]);

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
        <WithLoader loading={dataProvider === undefined}>
          {!!dataProvider && (<>
            <BaseComponent
              {...props}
              data={data.value}
              dataProvider={dataProvider}
              onData={onData}
              onError={onError}
              onLoading={onLoading}
              settings={config.current}
              isLoading={data.loading === true}
              isError={data.error !== undefined}
            />
            <WithError error={data.error}><WithLoader loading={data.loading} /></WithError>
          </>
          )}
        </WithLoader>
      );
    };
