import type { Signal } from "@preact/signals";

export type SignalObject<T extends object> = { [K in keyof T]: Signal<T[K]> };

export type FindSignal<T extends object, E> = (data: SignalObject<T>) => E;

export type CreateStore = <T extends object>(
    state: T,
    options?: StoreOptions,
) => <E>(findSignal: FindSignal<T, E>) => E;

export type StoreOptions = {
    persist?: PersistOptions;
};

export type PersistOptions = {
    name: string;
    storage: Storage | CacheStorage;
};

export interface PersistConfig extends PersistOptions {
    signalObject: object
}

declare const createStore: CreateStore;
