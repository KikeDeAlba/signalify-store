import type { PersistOptions } from "../types";
import { persistInCache } from "./storages/cache";
import { persistInStorage } from "./storages/storage";

export const configurePersist = <T extends object>(signalObject: T, persist?: PersistOptions) => {
    if (!persist) return;

    const storages = {
        storage: {
            selected: persist.storage instanceof Storage,
            run: persistInStorage,
        },
        cache: {
            selected: persist.storage instanceof CacheStorage,
            run: persistInCache,
        },
    };

    const run = Object.values(storages).find((value) => value.selected)?.run;

    run?.({
        name: persist.name,
        storage: persist.storage,
        signalObject,
    });
}

