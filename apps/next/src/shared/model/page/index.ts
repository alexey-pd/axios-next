import { sample, createEvent } from "effector";
import { createGate } from "effector-react";

export const PageGate = createGate();

export const pageInited = createEvent();

sample({
    clock: PageGate.open,
    target: pageInited,
});