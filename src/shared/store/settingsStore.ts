import { type Writable, writable } from "svelte/store";
import { Settings, getRealSettings } from "../class/Settings";
import { fetchSettings } from "../functions/Database";
import { setActivityListWritableFromDB } from "./activityStore";

/** Weight Metric used by the using */
export var settingsWritable: Writable<Settings> = writable(new Settings());

// init //
fetchSettings().then((settings) => {
	settingsWritable.set(getRealSettings(settings));
	setActivityListWritableFromDB(settings);
});
// init //