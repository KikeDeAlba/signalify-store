import { SignalifyObject } from "./signalify";
import type { CreateStore } from "../types";
import { configurePersist } from "./persist-config";

export const createStore: CreateStore = (data, options) => {
    const { persist } = options || {};

    const signalObject = SignalifyObject(data);

    configurePersist(signalObject, persist);

    return (findSignal) => findSignal(signalObject);
};
