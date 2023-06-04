import { writable, type Writable } from 'svelte/store';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import { WeightMetrics } from '../enum/WeightMetrics';

/** Weight Metric used by the using */
localStorage.setItem(LocalStorageKeys.WeightMetric, WeightMetrics.Kilos);

export const wm: Writable<WeightMetrics> = writable(<WeightMetrics> localStorage.getItem(LocalStorageKeys.WeightMetric));