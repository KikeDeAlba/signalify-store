import { signal } from "@preact/signals";
import type { SignalObject } from "../types";

export function SignalifyObject<T extends object>(data: T) {
    const signalObject = Object.entries(data).reduce(
        (acc, [key, value]) => {
            // @ts-ignore
            acc[key] = signal(value);
            return acc;
        },
        {} as SignalObject<T>,
    );

    return signalObject;
}
