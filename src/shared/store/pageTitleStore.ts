import { writable, type Writable } from "svelte/store";

export let pageTitleWritable: Writable<string> = writable();