import { writable, type Writable } from 'svelte/store';
import { Keys } from '../enum/Keys';
import { WeightMetrics } from '../enum/WeightMetrics';
import { get, set } from 'idb-keyval';

/** Weight Metric used by the using */
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //
export var wm: Writable<WeightMetrics> = writable(WeightMetrics.Kilos)
// set(Keys.WeightMetric, WeightMetrics.Kilos);
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //

get(Keys.WeightMetric).then((wmFetched: WeightMetrics) => {
    if (wmFetched) wm = writable(wmFetched);
})
