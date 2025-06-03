import { Activity, getRealActivity } from "../../class/Activity/Activity";
import { ActivityDate, createActivityDateFromDate } from "../../class/Activity/ActivityDate";
import { openDatabase } from "../Database";
import { getYesterday } from "../Utilitary";

/** Get all the activities from within the dates given.*/
export async function getActivitiesFromDatabaseWithinDates(startAD: ActivityDate, endAD: ActivityDate): Promise<Activity[]> { 
	const aList: Activity[] = []	

	const store = (await openDatabase()).transaction("activity-store", "readonly").store;

	let cursor = await store.openCursor(undefined, "prev");
	let adToAdd = endAD;

	while (cursor) {
		const dToAdd = adToAdd.toDate();
		const activityFromDatabase = getRealActivity(cursor.value);
		const adFromDatabase = activityFromDatabase.getActivityDate();

		if (adFromDatabase.formatDate() === adToAdd.formatDate()) {
			aList.push(activityFromDatabase);
			cursor = await cursor.continue();
		} else {
			aList.push(new Activity(adToAdd.year, adToAdd.month, adToAdd.day, null, null, null))
		}

		if (startAD.formatDate() === adToAdd.formatDate()) break 

		adToAdd = createActivityDateFromDate(getYesterday(dToAdd));
	}

	return aList;
}