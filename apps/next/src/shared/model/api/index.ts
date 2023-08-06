import { createStore, createEvent, attach, restore } from "effector";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const authTokenChanged = createEvent<string>();
export const $authToken = restore(authTokenChanged, "");

const createClient = () =>
  axios.create({
    baseURL: "https://catfact.ninja",
  });

export const $client = createStore<AxiosInstance>(createClient(), {
  serialize: "ignore",
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
