import { type Writable, writable } from 'svelte/store';
import { Setting, getRealSettings as getRealSetting } from '../class/Settings';
import { getSettingFromDatabase } from '../functions/Database';

/** Weight Metric used by the using */
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //
export var settingStore: Writable<Setting> = writable(new Setting());
// set(Keys.WeightMetric, WeightMetrics.Kilos);
// !! DEFAULT SET TO REPLACE BY USER SETTINGS !! //

export async function loadSetting() {
    const s = await getSettingFromDatabase();
    settingStore.set(getRealSetting(s));
}