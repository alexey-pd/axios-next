import { createStore, createEvent, attach, restore } from "effector";
import { IRequestMethod } from "./request";
import { client } from "./client";
import { AxiosRequestConfig } from "axios";
export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");

const $baseConfig = createStore<AxiosRequestConfig>({
  baseURL: "https://catfact.ninja",
});

export const createRequestFx = <Params = void, Result = any, Data = any>(
  url: IRequestMethod,
  config?: AxiosRequestConfig
) => {
  return attach({
    source: { baseConfig: $baseConfig },
    async effect({ baseConfig }, { params, data }: { params?: Params; data?: Data }) {
      const res = await client.request<Result, Result>(
        Object.assign(baseConfig, { url, params, data }, config)
      );

      return res;
    },
  });
};
