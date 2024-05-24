import type { PersistConfig } from "../../types";

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
        const normalizedObject = Object.entries(signalObject).reduce(
            (acc, [key, value]) => {
                // @ts-ignore
                acc[key] = value.value;
                return acc;
            },
            {},
        );

        storage.setItem(name, JSON.stringify(normalizedObject));
    });
};
