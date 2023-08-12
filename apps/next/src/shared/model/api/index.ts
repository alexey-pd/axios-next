import { createStore, createEvent, attach, restore } from "effector";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");
import { IRequestMethod } from "./request";

const createClient = () => axios.create();

export const $client = createStore<AxiosInstance>(createClient(), {
  serialize: "ignore",
});

const $config = createStore({
  baseURL: "https://catfact.ninja",
});

export const ClientInitFx = attach({
  source: { authToken: $authToken },
  effect({ authToken }) {
    const instance = createClient();

    instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
      if (authToken) {
        req.headers["Authorization"] = `Bearer ${authToken}`;
      }

      console.log("request headers", req.headers);

      return req;
    });

    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return res.data;
      }

      return res;
    });

    return instance;
  },
});

export const createRequestFx = <Params = void, Result = any>(
  url: IRequestMethod,
  params?: Params
) => {
  return attach({
    source: { client: $client, config: $config },
    async effect({ client, config }) {
      const res = await client.request<Result, Result>(
        Object.assign({ url, params }, config)
      );

      return res;
    },
  });
};
