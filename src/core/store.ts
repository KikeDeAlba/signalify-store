import { SignalifyObject } from "./signalify";
import type { CreateStore } from "../types";
import { configurePersist } from "./persist-config";

export const createStore: CreateStore = (state, options) => {
    const { persist } = options || {};

    const data = state({
        set(state) {
            if (state instanceof Function) {
                const normalizedSignalsObject = Object.entries(signalObject)
                    .reduce((acc, [key, value]) => {
                        // @ts-ignore
                        acc[key] = value.value;
                        return acc;
                    }, {});

                // @ts-ignore
                const newValues = state(normalizedSignalsObject);

                for (const [key, value] of Object.entries(newValues)) {
                    // @ts-ignore
                    signalObject[key].value = value;
                }
            }
        },
        // @ts-ignore
        get() {
            const normalizedSignalsObject = Object.entries(signalObject).reduce(
                (acc, [key, value]) => {
                    // @ts-ignore
                    acc[key] = value.value;
                    return acc;
                },
                {},
            );

            return normalizedSignalsObject;
        },
    })

    const signalObject = SignalifyObject(data);

    configurePersist(signalObject, persist);

    return (findSignal) => findSignal(signalObject);
};

const store = createStore(({ set }) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
}))