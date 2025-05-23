import { Activity } from "../class/Activity/Activity";
import { getActivitiesFromDatabase } from "./Database";
import { downloadAsJson, truncateNumber } from "./Utilitary";


export function setAverageActivities(
	activities: Activity[], 
	nbDaysForAveraging: number
): Activity[] {
	let averageActivities: Activity[] = [];

	let howManyActivities: number;
	let averageWeight: number;
	let averageCalories: number;
	let averageSteps: number;

	for (let i = 0; i < activities.length; i++) {
		const a = activities[i];

		howManyActivities = 0;
		averageWeight = 0;
		averageCalories = 0;
		averageSteps = 0;

		for (let j = 0; j < nbDaysForAveraging; j++) {
			const activityToUseForAverage = activities[i+j];
			averageWeight += activityToUseForAverage.weight;
			averageCalories += activityToUseForAverage.calories;
			averageSteps += activityToUseForAverage.steps;
			howManyActivities++;

			if (i+j+1 >= activities.length) break; 
		}

		averageCalories = truncateNumber(averageCalories / howManyActivities, 0);
		averageWeight = truncateNumber( averageWeight / howManyActivities, 1);
		averageSteps = truncateNumber( averageSteps / howManyActivities, 0);

		const averageActivity = new Activity(
			a.year, a.month, a.day, averageWeight, averageCalories, averageSteps
		);
		averageActivities.push(averageActivity);
	}

	return averageActivities;
}

export async function exportActivities(nbDaysForAveraging: number) {
	const activities = await getActivitiesFromDatabase();

	const averageActivities = setAverageActivities(activities, nbDaysForAveraging);

	downloadAsJson(activities, "activities");
	downloadAsJson(averageActivities, "averageActivities");
}
