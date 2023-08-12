import { createEvent, createStore, sample } from "effector";
import { createRequestFx } from "~/shared/model/api";

export const readFactFired = createEvent();

export const readFactFx = createRequestFx<
  void,
  { fact: string; length: number }
>("fact");

export const $fact = createStore("");

sample({
  clock: readFactFired,
  target: readFactFx,
});

sample({
  clock: readFactFx.doneData,
  fn: ({ fact }) => fact,
  target: $fact,
});
