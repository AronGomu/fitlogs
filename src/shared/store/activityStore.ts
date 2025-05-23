import { writable, type Writable } from "svelte/store";
import { getActivitiesFromDatabase } from "../functions/Database";
import type { Activity } from "../class/Activity/Activity";
import type { ActivityDate } from "../class/Activity/ActivityDate";
import { setAverageActivities } from "../functions/Activity";
import type { Setting } from "../class/Settings";
import { settingStore } from "./settingStore";

export let activitiesStore: Writable<Activity[]> = writable();
export let averageActivitiesStore: Writable<Activity[]> = writable();

/** Load the list of programs stored locally. */
export async function loadActivitiesStore(
  s: Setting,
  sort: 'asc' | 'desc' = 'asc',
): Promise<void> {
  const activitiesDatabase = await getActivitiesFromDatabase(s.statsRangeSelected, sort);
  activitiesStore.set(activitiesDatabase);

  if (!s.statsRangeSelected) s.statsRangeSelected = activitiesDatabase.length;
  
  const aaDatabase = setAverageActivities(activitiesDatabase, s.nbDaysForAveraging);
  averageActivitiesStore.set(aaDatabase);
  
}


export let adToModify: Writable<ActivityDate> = writable(null);