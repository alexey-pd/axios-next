import { attach, restore } from "effector";
import { request } from "~/shared/model/api/request";
import { $client } from "~/shared/model/api";

type Data = { fact: string };

export const getFactFx = attach({
  source: { client: $client },
  async effect({ client }) {
    const { fact } = await client.get<Data, Data>("fact");
    return fact;
  },
});

export const readFactFx = attach({
  source: { client: $client },
  async effect({ client }) {
    return request(client).fact();
  },
});

getFactFx.failData.watch(console.log);

export const $fact = restore(getFactFx.doneData, "");
