import { sample } from "effector";
import {
  appInited,
  authTokenChanged,
  ClientInitFx,
  $client,
  PageGate,
} from ".";

sample({ clock: [appInited, authTokenChanged], target: ClientInitFx });
sample({ clock: ClientInitFx.doneData, target: $client });
sample({
  clock: PageGate.open,
  target: appInited,
});

ClientInitFx.done.watch(() => console.log("axios inited"));
