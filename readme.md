
# signals-store

[![npm version](https://badge.fury.io/js/signalify-store.svg)](https://badge.fury.io/js/signalify-store)

> A simple store for [Preact](https://preactjs.com/) using [Signals](https://github.com/preactjs/signals).

## Install

```sh
npm install signalify-store
```

## Usage

```js
import { createStore } from "signalify-store";
```

```js
// create a store with a default value
const store = createStore({ count: 0 });

// get the value of the store
const count = store((state) => state.count);

// subscribe to the store
count.subscribe((count) => {
	console.log("count", count);
    // => 0
});

// update the store
count.value++;
// => count 1
```

## Persist

```js
const store = createStore(
	{ count: 0 },
	{
		persist: {
			name: "my-app",
			storage: window.localStorage // or window.sessionStorage or window.caches or any other instance of Storage
		},
	},
);
```

Create a store with the given data and options.
