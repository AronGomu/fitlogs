import { writable, type Writable } from "svelte/store";
import { Activity, buildAverageActivityList, getRealActivity } from "../class/Activity/Activity";
import type { Settings } from "../class/Settings";
import { getActivityListFromDB } from "../database/ActivityDatabase";

let activityList: Activity[] = [];
let activityAverageList: Activity[] = [];
export let activityListWritable: Writable<Activity[]> = writable([]);
activityListWritable.subscribe(aList => activityList = aList);

export let activityAverageListWritable: Writable<Activity[]> = writable([]);
activityAverageListWritable.subscribe(aaList => activityAverageList = aaList);

export async function updateActivityListWritable(settings: Settings): Promise<void> {
  activityList = await getActivityListFromDB(settings.nbDayShow, settings.sortActivityList);
  activityListWritable.set(activityList);
  updateActivityAverageListWritable(settings.nbDayAverage, activityList)
}

async function updateActivityAverageListWritable(nbDaysAverage, activityList) {
  const activityAverageList = await buildAverageActivityList(nbDaysAverage, activityList);
  activityAverageListWritable.set(activityAverageList);
}