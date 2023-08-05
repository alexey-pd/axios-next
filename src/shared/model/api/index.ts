import { createStore, createEvent, attach, restore, Effect } from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
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
  source: { api: $client },
  async effect({ api }) {
    const res = await api?.get<{ fact: string }>("fact");
    return res?.data.fact;
  },
});

export const $fact = restore(getFactFx.doneData, "");
