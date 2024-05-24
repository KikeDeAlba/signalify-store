import type { PersistConfig } from "../../types";
import { unSignalifyObject } from "../signalify";

export const persistInStorage = ({
    name,
    storage,
    signalObject,
}: PersistConfig) => {
    if (!(storage instanceof Storage)) return;

    const storageObject = JSON.parse(storage.getItem(name) || "{}");

    for (const [key, value] of Object.entries(storageObject)) {
        if (storageObject[key] === null) {
            continue;
        }

        // @ts-ignore
        signalObject[key].value = value;
    }

    window.addEventListener("beforeunload", () => {
        const normalizedObject = unSignalifyObject(signalObject)

        storage.setItem(name, JSON.stringify(normalizedObject));
    });
};
