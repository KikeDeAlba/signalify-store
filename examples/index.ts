import { createStore } from "@local/signals-store";

interface Store {
    count: number;
    increment: () => void;
}

const store = createStore<Store>(({ set }) => ({
    count: 0,
    increment: () => set(state => { state.count.value++ })
}))