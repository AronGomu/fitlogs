import { type Writable, writable } from 'svelte/store';
import { getRealSettings as getRealSetting, Settings } from '../class/Settings';
import { getSettingFromDatabase } from '../database/settingDatabase';
import { updateActivityListWritable } from './activityStore';

export var settingsWritable: Writable<Settings> = writable();

export async function loadSetting() {
    const s = await getSettingFromDatabase();
    settingsWritable.set(getRealSetting(s));
    updateActivityListWritable(s)
}