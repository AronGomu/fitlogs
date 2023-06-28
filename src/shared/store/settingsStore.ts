import { writable, type Writable } from 'svelte/store';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import { WeightMetrics } from '../enum/WeightMetrics';

/** Weight Metric used by the using */
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //
localStorage.setItem(LocalStorageKeys.WeightMetric, WeightMetrics.Kilos);
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //

export const wm: Writable<WeightMetrics> = writable(<WeightMetrics> localStorage.getItem(LocalStorageKeys.WeightMetric));