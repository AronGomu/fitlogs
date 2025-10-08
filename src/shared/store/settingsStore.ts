import { type Writable, writable } from "svelte/store";
import { Settings, getRealSettings } from "../class/Settings";
import { updateActivityListWritable } from "./activityStore";

const SETTINGS_KEY = 'settings';

/** Weight Metric used by the using */
export var settingsWritable: Writable<Settings> = writable(new Settings());

// init //

let settings: Settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
if (!settings) settings = new Settings();
else settings = getRealSettings(settings)
settingsWritable.set(settings);

  console.log(settings);


updateActivityListWritable(settings);
// init //

export function saveSettings(newSettings: Settings) {
	console.log(newSettings);
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
	console.log(JSON.parse(localStorage.getItem(SETTINGS_KEY)));
	
	settingsWritable.set(newSettings);

}