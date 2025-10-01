import { writable, type Writable } from "svelte/store";
import { getActivityListFromDatabase } from "../functions/Database";
import type { Activity } from "../class/Activity/Activity";
import type { ActivityDate } from "../class/Activity/ActivityDate";
import { Settings } from "../class/Settings";
import { buildAverageActivityList } from "../functions/Activity";

export let activityListWritable: Writable<Activity[]> = writable([]);
export let activityAverageListWritable: Writable<Activity[]> = writable([]);



/** Load the list of programs stored locally. */
export async function setActivityListWritableFromDB(
  maxNumberOfActivitiesToGet: number = null,
  sort: "asc" | "desc" = "asc"
): Promise<void> {
  const realActivityList = await getActivityListFromDatabase(maxNumberOfActivitiesToGet, sort);
  console.log(realActivityList);
  activityListWritable.set(realActivityList);
  buildAverageActivityListAsync(realActivityList)
}

async function buildAverageActivityListAsync(activityList) {
  const activityAverageList = await buildAverageActivityList(activityList);
  activityAverageListWritable.set(activityAverageList);
  console.log(activityAverageList);
}

export let adToModify: Writable<ActivityDate> = writable(null);
