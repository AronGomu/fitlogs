import { writable, type Writable } from "svelte/store";
import { getActivitiesFromDatabase } from "../functions/Database";
import type { Activity } from "../class/Activity/Activity";
import type { ActivityDate } from "../class/Activity/ActivityDate";
import { setAverageActivities } from "../functions/Activity";

export let activities: Writable<Activity[]> = writable();
export let aaList: Writable<Activity[]> = writable();

loadActivitiesStore();

/** Load the list of programs stored locally. */
export async function loadActivitiesStore(
  n: number = 15,
  sort: 'asc' | 'desc' = 'asc'
): Promise<void> {
  const activitiesDatabase = await getActivitiesFromDatabase(n, sort);
  activities.set(activitiesDatabase);

  if (!n) n = activitiesDatabase.length;
  const aaDatabase = setAverageActivities(activitiesDatabase, n);
  aaList.set(aaDatabase);
}


export let adToModify: Writable<ActivityDate> = writable(null);