import { sample } from "effector";
import { appInited, authTokenChanged, ClientInitFx, $client } from ".";

sample({ clock: [appInited, authTokenChanged], target: ClientInitFx });
sample({ clock: ClientInitFx.doneData, target: $client });

ClientInitFx.done.watch(() => console.log("axios inited"));