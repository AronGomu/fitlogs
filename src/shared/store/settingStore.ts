import { type Writable, writable } from 'svelte/store';
import { Setting, getRealSettings as getRealSetting } from '../class/Settings';
import { getSettingFromDatabase } from '../functions/database/settingDatabase';

export var settingStore: Writable<Setting> = writable();

export async function loadSetting() {
    const s = await getSettingFromDatabase();
    if (s) settingStore.set(getRealSetting(s));
}