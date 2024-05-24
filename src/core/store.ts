import { SignalifyObject } from "./signalify";
import type { CreateStore } from "../types";
import { configurePersist } from "./persist-config";

export const createStore: CreateStore = (state, options) => {
    const { persist } = options || {};

    const signalObject = SignalifyObject(state);

    configurePersist(signalObject, persist);

    return (findSignal) => findSignal(signalObject);
};

