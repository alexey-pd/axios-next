import { sample } from "effector";
import { authTokenChanged, ClientInitFx, $client, $authToken } from ".";

import { pageInited } from "~/shared/model/page";

sample({
  clock: [pageInited, authTokenChanged],
  source: $authToken,
  filter: (authToken) => Boolean(authToken),
  target: ClientInitFx,
});

sample({
  clock: [pageInited],
  target: ClientInitFx,
});

sample({ clock: ClientInitFx.doneData, target: $client });

ClientInitFx.done.watch(({ params }) =>
  console.log("axios inited with params:", params)
);
