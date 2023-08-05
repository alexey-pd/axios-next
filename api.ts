import {
  createStore,
  createEvent,
  sample,
  attach,
  restore,
  Effect,
} from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const $authToken = createStore("000");

export const $axios = createStore<AxiosInstance | null>(null, {
  serialize: "ignore",
});

export const appInited = createEvent();

const AxiosInitFx = attach({
  source: { authToken: $authToken },
  effect({ authToken }) {
    const instance = axios.create({
      baseURL: "https://catfact.ninja",
    });

    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers["Authorization"] = `Bearer ${authToken}`;
      return config;
    });

    instance.interceptors.response.use((res) => res);

    return instance;
  },
});

sample({ clock: appInited, target: AxiosInitFx });
sample({ clock: AxiosInitFx.doneData, target: $axios });

export const getFactFx: Effect<void, string | undefined> = attach({
  source: { api: $axios },
  async effect({ api }) {
    const res = await api?.get<{ fact: string }>("fact");
    return res?.data.fact;
  },
});

export const $fact = restore(getFactFx.doneData, "");
