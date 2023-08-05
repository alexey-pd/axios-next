import type { AxiosInstance } from "axios";

export const request = (api: AxiosInstance | null) => ({
  fact: async () => {
    const res = await api?.get<{ fact: string }>("fact");
    return res?.data.fact;
  },
});
