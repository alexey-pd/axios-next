import type { AxiosInstance } from "axios";

type Data = { fact: string };

export const request = (api: AxiosInstance) => ({
  fact: async () => {
    const { fact } = await api.get<Data, Data>("fact");
    return fact;
  },
});
