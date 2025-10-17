import { type Writable, writable } from 'svelte/store';
import { getRealSettings as getRealSetting, Settings } from '../class/Settings';
import { getSettings } from '../database/SettingsDatabase';
import { updateActivityListWritable } from './activityStore';

export var settingsWritable: Writable<Settings> = writable();

export async function loadSetting() {
    const s = await getSettings();
    settingsWritable.set(getRealSetting(s));
    updateActivityListWritable(s)
}

loadSetting();