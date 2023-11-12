import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd";
import { config as appConfig, appealingMessage, config } from "@lib/constants";
import { useAppSelector } from "@redux/store";

export type responseType<T> = {
  message: string;
  name: string;
  success: boolean;
  statusCode: number;
  error: string;
} & T;

export default function useFetch(fetchOnMount = false) {
  const [fetching, setFetching] = React.useState<boolean>(fetchOnMount);
  const token = useAppSelector((s) => s.session.token);
  const [abortControllers, setAbortControllers] = React.useState<
    AbortController[]
  >([]);

  // const signal = abortController.signal;

  const abortOngoingRequests = React.useCallback(() => {
    setAbortControllers((abortControllers) => {
      abortControllers.forEach((c) => c.abort());
      return [];
    });
  }, []);

  const fetcher = React.useCallback(
    async <T>(config: AxiosRequestConfig): Promise<responseType<T>> => {
      setFetching(true);

      // abortOngoingRequests();

      // const abortController = new AbortController();
      // setAbortControllers((s) => [...s, abortController]);

      try {
        const response = await axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
          // timeout: 50000,
          // signal: abortController.signal,
          baseURL: appConfig.baseUrl,
          validateStatus: function (status) {
            return status <= 500; // Resolve only if the status code is less than 500
          },
        });
        const responseData = await response.data;

        return responseData;
      } catch (error: any) {
        console.error(error);
        return {
          error:
            error.message == "Network Error"
              ? "It seems you are offline, please check you internet connection and try again"
              : error.message,
          ...error.data,
        };
      } finally {
        setFetching(false);
      }
    },
    [abortOngoingRequests, token]
  );

  const sendCode = React.useCallback(
    async (data: object) => {
      const res = await fetcher<any>({
        method: "POST",
        url: config.urls.sendCode,
        data,
      });

      if (!res.status || res.error) {
        message.error(res.message ?? res.error ?? appealingMessage);
      }

      message.success("Otp Sent to your email");
    },
    [fetcher]
  );

  return {
    fetching,
    fetcher,
    setFetching,
  };
}
