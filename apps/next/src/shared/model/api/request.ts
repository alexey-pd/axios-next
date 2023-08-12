import type { AxiosInstance, AxiosRequestConfig } from "axios";

type Data = { fact: string };

export const request = (api: AxiosInstance) => ({
  fact: async (params?: { limit: string }) => {
    const { fact } = await api.get<Data, Data>("fact", { params });
    return fact;
  },
});

export type IRequestType = ReturnType<typeof request>;
export type IRequestMethod = keyof IRequestType;
