import { createStore } from "@local/signals-store";

const storeInCache = createStore(
	{ count: 0 },
	{
		persist: {
			name: "my-app",
			storage: window.caches,
		},
	},
);

const storeInSession = createStore(
	{ count: 0 },
	{
		persist: {
			name: "my-app",
			storage: window.sessionStorage,
		},
	},
);

const storeInLocal = createStore(
	{ count: 0 },
	{
		persist: {
			name: "my-app",
			storage: window.localStorage,
		},
	},
);

const storeNoPersist = createStore({
	count: 0,
});

const count = storeInCache((state) => state.count);

count.subscribe((count) => {
	console.log("count", count);
});

setInterval(() => {
	count.value++;
}, 1000);
