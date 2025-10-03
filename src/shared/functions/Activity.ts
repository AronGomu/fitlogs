import { Activity } from "../class/Activity/Activity";
import { getActivityListFromDB } from "./Database";
import { downloadAsJson, truncateNumber } from "./Utils";


export function buildAverageActivityList(
	nbDaysUsedForAverage = 7,
	activityList: Activity[]
): Activity[] {

	let activityAverageList: Activity[] = [];

	for (let i = 0; i < activityList.length; i++) {
		const a = activityList[i];
		activityAverageList.push(getAverageActivity(activityList, nbDaysUsedForAverage, i));
	}

	return activityAverageList;
}

export type AverageProperty = "calories" | "weight" | "steps";


export function getAverageActivity(
	activityList: Activity[],
	nbDaysUsedForAverage: number,
	i: number,
): Activity {

	let activityToAverage = activityList[i];
	let totalCalories; let totalWeight; let totalSteps;
	let nbElementCalories = 0; let nbElementWeight = 0; let nbElementSteps = 0;

	for (let j = 0; j < nbDaysUsedForAverage; j++) {
		if (!activityList[i-j]) break;
		totalCalories += activityList[i-j].calories;
		totalWeight+= activityList[i-j].weight;
		totalSteps += activityList[i-j].steps;
	}

	return new Activity(
		activityToAverage.year,
		activityToAverage.month,
		activityToAverage.day,
		truncateNumber(totalWeight/nbElementWeight, 0),
		truncateNumber(totalCalories/nbElementCalories, 1),
		truncateNumber(totalSteps/nbElementSteps, 0),
	)
}

export async function exportActivityList(nbDaysUsedForAverage) {
	const ActivityList = await getActivityListFromDB();

	const averageActivityList = buildAverageActivityList(nbDaysUsedForAverage, ActivityList);

	downloadAsJson(ActivityList, "ActivityList");
	downloadAsJson(averageActivityList, "averageActivityList");
}
