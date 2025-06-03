import { writable, type Writable } from "svelte/store";
import { Activity } from "../class/Activity/Activity";
import { createActivityDateFromDate, type ActivityDate } from "../class/Activity/ActivityDate";
import { setAverageActivities } from "../functions/Activity";
import type { Setting } from "../class/Settings";
import { getDateFromXDays } from "../functions/Utilitary";
import { getActivitiesFromDatabaseWithinDates } from "../functions/database/activityDatabase";

export let activitiesStore: Writable<Activity[]> = writable();
export let averageActivitiesStore: Writable<Activity[]> = writable();

/** Load the list of programs stored locally. */
export async function loadActivitiesStore(s: Setting): Promise<void> {

    const today = new Date();
    let startAD = null;
    if (s.statsRangeSelected) {
        const firstDate = getDateFromXDays(today, s.statsRangeSelected);
        startAD = createActivityDateFromDate(firstDate);
    }

    const endAD = createActivityDateFromDate(today);

    const activitiesDatabase = await getActivitiesFromDatabaseWithinDates(startAD, endAD);
    activitiesStore.set(activitiesDatabase);

    if (!s.statsRangeSelected) s.statsRangeSelected = activitiesDatabase.length;
    
    const aaDatabase = setAverageActivities(activitiesDatabase, s.nbDaysForAveraging);
    averageActivitiesStore.set(aaDatabase);
  
}

export let adToModify: Writable<ActivityDate> = writable(null);