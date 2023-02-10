import { createStore, createEvent, sample, attach } from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const $authToken = createStore("000");

export const $axios = createStore<AxiosInstance | null>(null, {
  serialize: "ignore",
});

export const appInited = createEvent();

const AxiosInitFx = attach({
  source: { authToken: $authToken },
  effect({ authToken }) {
    const instance = axios.create();

    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers["Authorization"] = `Bearer ${authToken}`;
      return config;
    });

    return instance;
  },
});

sample({ clock: appInited, target: AxiosInitFx });
sample({ clock: AxiosInitFx.doneData, target: $axios });

export const requestFx = attach({
  source: { api: $axios },
  async effect({ api }) {
    const res = await api?.get("https://catfact.ninja/breeds");
    console.log("api", res?.data);
  },
});
