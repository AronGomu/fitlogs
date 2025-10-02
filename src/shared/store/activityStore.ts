import { writable, type Writable } from "svelte/store";
import { getActivityListFromDB as getActivityListFromDB } from "../functions/Database";
import type { Activity } from "../class/Activity/Activity";
import type { ActivityDate } from "../class/Activity/ActivityDate";
import { buildAverageActivityList } from "../functions/Activity";
import type { Settings } from "../class/Settings";

export let activityListWritable: Writable<Activity[]> = writable([]);
export let activityAverageListWritable: Writable<Activity[]> = writable([]);

/** Load the list of programs stored locally. */
export async function setActivityListWritableFromDB(settings: Settings): Promise<void> {
  const realActivityList = await getActivityListFromDB(
    settings.nbDaysToShow, settings.sortActivityList
  );
  activityListWritable.set(realActivityList);
  setActivityAverageListWritable(settings.nbDaysUsedForAverage, realActivityList)
}

async function setActivityAverageListWritable(
  nbDaysUsedForAverage: number,
  activityList: Activity[]
) {
  const activityAverageList = await buildAverageActivityList(nbDaysUsedForAverage, activityList);
  activityAverageListWritable.set(activityAverageList);
}

export let adToModify: Writable<ActivityDate> = writable(null);
