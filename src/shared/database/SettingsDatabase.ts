import { getRealSettings, Settings } from "../class/Settings";
import { openDatabase, type StoreName } from "../functions/Database";

const SETTINGS_KEY = "settings"

export async function getSettings(): Promise<Settings> {
	return getRealSettings(JSON.parse(localStorage.getItem(SETTINGS_KEY)));
}

export async function saveSettings(settings: Settings): Promise<Settings> {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
	return getSettings();
}