import { Activity } from "../class/Activity/Activity";
import { getActivityListFromDatabase } from "./Database";
import { downloadAsJson, truncateNumber } from "./Utilitary";


export function buildAverageActivityList(activityList: Activity[], nbDaysUsedForAverage = 7): Activity[] {
	let activityAverageList: Activity[] = [];

	if (nbDaysUsedForAverage > activityList.length) nbDaysUsedForAverage = activityList.length;

	let averageCalories: number; let averageWeight: number; let averageSteps: number;

	for (let i = 0; i < nbDaysUsedForAverage; i++) {
		const a = activityList[i];

		averageCalories = truncateNumber(getAverage(activityList, nbDaysUsedForAverage, "calories", i), 0,);
		averageWeight = truncateNumber(getAverage(activityList, nbDaysUsedForAverage, "weight", i), 1,);
		averageSteps = truncateNumber(getAverage(activityList, nbDaysUsedForAverage, "steps", i), 0,);

		const newA = new Activity(a.year, a.month, a.day, averageWeight, averageCalories, averageSteps);
		activityAverageList.push(newA);
	}

	return activityAverageList;
}

export type AverageProperty = "calories" | "weight" | "steps";
export function getAverage(activityList: Activity[], nbDaysUsedForAverage: number,
	propertyName: AverageProperty, nbDaysUsedForAverageBefore: number
): number {

	if (!activityList || activityList.length < 1) return 0;

	let total: number = 0;
	let nbElements: number = 0;

	let startingDay = 0 + nbDaysUsedForAverageBefore;
	let len = nbDaysUsedForAverage + nbDaysUsedForAverageBefore;

	if (startingDay > activityList.length) return 0;
	if (len > activityList.length) len = activityList.length;

	for (let i = startingDay; i < len; i++) {
		const a = activityList[i];
		if (!a) continue;
		if (!a[propertyName]) continue;

		total += a[propertyName];
		nbElements += 1;
	}

	return total / nbElements;
}

export async function exportActivityList() {
	const ActivityList = await getActivityListFromDatabase();

	const averageActivityList = buildAverageActivityList(ActivityList, ActivityList.length - 1);

	downloadAsJson(ActivityList, "ActivityList");
	downloadAsJson(averageActivityList, "averageActivityList");
}
