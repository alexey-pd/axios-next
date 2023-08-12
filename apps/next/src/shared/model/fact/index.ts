import { attach, restore } from "effector";
import { request } from "~/shared/model/api/request";
import { $client } from "~/shared/model/api";

export const readFactFx = attach({
  source: { client: $client },
  async effect({ client }) {
    return request(client).fact();
  },
});

export const $fact = restore(readFactFx.doneData, "");
