import { createStore, createEvent, attach, restore } from "effector";
import { IRequestMethod } from "./request";
import { client } from "./client";
import { AxiosRequestConfig } from "axios";
export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");

const $baseConfig = createStore<AxiosRequestConfig>({
  baseURL: "https://catfact.ninja",
});

export const createRequestFx = <Params = void, Result = any>(
  url: IRequestMethod,
  params?: Params,
  config?: AxiosRequestConfig
) => {
  return attach({
    source: { baseConfig: $baseConfig },
    async effect({ baseConfig }) {
      const res = await client.request<Result, Result>(
        Object.assign(baseConfig, { url, params }, config)
      );

      return res;
    },
  });
};
