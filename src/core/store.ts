import { SignalifyObject } from "./signalify";
import type { CreateStore } from "../types";
import { configurePersist } from "./persist-config";

export const createStore: CreateStore = (state, options) => {
    const { persist } = options || {};

    const data = state({
        set: cb => cb(signalObject),
        // @ts-ignore
        get() {
            return signalObject;
        },
    })

    const signalObject = SignalifyObject(data);

    configurePersist(signalObject, persist);

    return (findSignal) => findSignal(signalObject);
};

