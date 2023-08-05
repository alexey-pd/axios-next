import {
  createStore,
  createEvent,
  sample,
  attach,
  restore,
  Effect,
} from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");

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

sample({ clock: [appInited, authTokenChanged], target: AxiosInitFx });
sample({ clock: AxiosInitFx.doneData, target: $axios });

export const getFactFx: Effect<void, string | undefined> = attach({
  source: { api: $axios },
  async effect({ api }) {
    const res = await api?.get<{ fact: string }>("fact");
    return res?.data.fact;
  },
});

export const $fact = restore(getFactFx.doneData, "");
AxiosInitFx.done.watch(() => console.log("axios inited"));
