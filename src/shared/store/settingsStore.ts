import { type Writable, writable } from 'svelte/store';
import { Setting, getRealSettings } from '../class/Settings';
import { fetchSettings } from '../functions/Database';

/** Weight Metric used by the using */
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //
export var settings: Writable<Setting> = writable(new Setting());
// set(Keys.WeightMetric, WeightMetrics.Kilos);
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //

fetchSettings().then(s => {
    settings.set(getRealSettings(s));
})
