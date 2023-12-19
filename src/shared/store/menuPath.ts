import { writable, type Writable } from "svelte/store";

export let menuPath: Writable<string> = writable(null);
