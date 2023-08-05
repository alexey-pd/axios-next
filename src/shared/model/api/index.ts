import { createStore, createEvent, attach, restore, Effect } from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { request } from "./request";

export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");

export const $client = createStore<AxiosInstance | null>(null, {
  serialize: "ignore",
});

export const appInited = createEvent();

export const ClientInitFx = attach({
  source: { authToken: $authToken },
  effect({ authToken }) {
    const instance = axios.create({
      baseURL: "https://catfact.ninja",
    });

    instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
      if (authToken) {
        req.headers["Authorization"] = `Bearer ${authToken}`;
      }

      console.log("request headers", req.headers);

      return req;
    });

    instance.interceptors.response.use((res) => res);

    return instance;
  },
});

export const getFactFx: Effect<void, string | undefined> = attach({
  source: { client: $client },
  async effect({ client }) {
    const fact = request(client).fact();
    return fact;
  },
});

export const $fact = restore(getFactFx.doneData, "");
