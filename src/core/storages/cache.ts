import type { PersistConfig } from "../../types";
import { unSignalifyObject } from "../signalify";

export const persistInCache = ({
    name,
    storage,
    signalObject,
}: PersistConfig) => {
    if (!(storage instanceof CacheStorage)) return;

    storage.open(name).then((cache) => {
        if (!cache) return;

        cache
            .match(name)
            .then((obj) => obj?.json())
            .then((objectInCache) => {
                const cacheObject = objectInCache ? JSON.parse(objectInCache) : {};

                for (const [key, value] of Object.entries(cacheObject)) {
                    if (cacheObject[key] === null) {
                        continue;
                    }

                    // @ts-ignore
                    signalObject[key].value = value;
                }

                window.addEventListener("beforeunload", () => {
                    const normalizedObject = unSignalifyObject(signalObject)

                    const response = Response.json(normalizedObject);

                    cache.put(name, response);
                });
            });
    });
};
