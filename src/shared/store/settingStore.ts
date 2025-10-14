import { type Writable, writable } from 'svelte/store';
import { Setting, getRealSettings as getRealSetting } from '../class/Settings';
import { getSettingFromDatabase, saveSettings } from '../functions/database/settingDatabase';

export var settingStore: Writable<Setting> = writable();

export async function loadSetting() {
    const s = await getSettingFromDatabase();
    settingStore.set(getRealSetting(s));
}