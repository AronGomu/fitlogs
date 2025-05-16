import { writable, type Writable } from "svelte/store";
import { getActivitiesFromDatabase } from "../functions/Database";
import type { Activity } from "../class/Activity/Activity";
import type { ActivityDate } from "../class/Activity/ActivityDate";

export let activities: Writable<Activity[]> = writable([]);

loadActivitiesStore();

/** Load the list of programs stored locally. */
export async function loadActivitiesStore(
  n: number = 90,
  sort: 'asc' | 'desc' = 'asc'
): Promise<void> {
  activities.set(await getActivitiesFromDatabase(n, sort));
}


export let adToModify: Writable<ActivityDate> = writable(null);