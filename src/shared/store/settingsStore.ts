import { type Writable, writable } from 'svelte/store';
import { Settings, getRealSettings } from '../class/Settings';
import { fetchSettings } from '../functions/Database';

/** Weight Metric used by the using */
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //
export var settings: Writable<Settings> = writable(new Settings());
// set(Keys.WeightMetric, WeightMetrics.Kilos);
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //

fetchSettings().then(s => {
    settings.set(getRealSettings(s));
})
