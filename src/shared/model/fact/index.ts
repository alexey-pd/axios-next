import { Effect, attach, restore } from "effector";
import { $client } from "~/shared/model/api";

type Data = { fact: string };

export const getFactFx: Effect<void, string> = attach({
  source: { client: $client },
  async effect({ client }) {
    const { fact } = await client.get<Data, Data>("fact");
    return fact;
  },
});

export const $fact = restore(getFactFx.doneData, "");
