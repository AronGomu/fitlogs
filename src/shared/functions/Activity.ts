import { Activity } from "../class/Activity/Activity";
import { getActivitiesFromDatabase } from "./Database";
import { downloadAsJson, truncateNumber } from "./Utilitary";


export function setAverageActivities( activities: Activity[], nbDaysForAveraging: number): Activity[] {
	let averageActivities: Activity[] = [];

	let howManyActivitiesForWeight: number;
	let averageWeight: number;
	let howManyActivitiesForCalories: number;
	let averageCalories: number;
	let howManyActivitiesForSteps: number;
	let averageSteps: number;

	for (let i = 0; i < activities.length; i++) {
		const a = activities[i];

		howManyActivitiesForWeight = 0;
		averageWeight = 0;
		howManyActivitiesForCalories = 0;
		averageCalories = 0;
		howManyActivitiesForSteps = 0;
		averageSteps = 0;

		for (let j = 0; j < nbDaysForAveraging; j++) {
			const activityToUseForAverage = activities[i+j];
			if (activityToUseForAverage.weight) {
				averageWeight += activityToUseForAverage.weight;
				howManyActivitiesForWeight++;
			}
			if (activityToUseForAverage.calories) {
				averageCalories += activityToUseForAverage.calories;
				howManyActivitiesForCalories++;
			}
			
			if (activityToUseForAverage.steps) {
				averageSteps += activityToUseForAverage.steps;
				howManyActivitiesForSteps++;
			}

			if (i+j+1 >= activities.length) break; 
		}

		averageWeight = truncateNumber(averageWeight / howManyActivitiesForWeight, 1);
		averageCalories = truncateNumber(averageCalories/ howManyActivitiesForCalories, 0);
		averageSteps = truncateNumber( averageSteps / howManyActivitiesForSteps, 0);

		const averageActivity = new Activity(
			a.year, a.month, a.day, averageWeight, averageCalories, averageSteps
		);
		averageActivities.push(averageActivity);
	}

	return averageActivities;
}

export function setMedianActivities(
	activities: Activity[], 
	nbDaysForAveraging: number
): Activity[] {
	throw new Error("TODO MEDIAN");
	
	let medianActivities: Activity[] = [];

	let howManyActivities: number;
	let medianWeight: number;
	let medianCalories: number;
	let medianSteps: number;

	for (let i = 0; i < activities.length; i++) {
		const a = activities[i];

		howManyActivities = 0;
		medianWeight = 0;
		medianCalories = 0;
		medianSteps = 0;

		for (let j = 0; j < nbDaysForAveraging; j++) {
			const activityToUseForMedian = activities[i+j];
			medianWeight += activityToUseForMedian.weight;
			medianCalories += activityToUseForMedian.calories;
			medianSteps += activityToUseForMedian.steps;
			howManyActivities++;

			if (i+j+1 >= activities.length) break; 
		}

		medianCalories = truncateNumber(medianCalories / howManyActivities, 0);
		medianWeight = truncateNumber(medianWeight / howManyActivities, 1);
		medianSteps = truncateNumber(medianSteps / howManyActivities, 0);

		const medianActivity = new Activity(
			a.year, a.month, a.day, medianWeight, medianCalories, medianSteps
		);
		medianActivities.push(medianActivity);
	}

	return medianActivities;
}

export async function exportActivities(nbDaysForAveraging: number) {
	const activities = await getActivitiesFromDatabase();

	const averageActivities = setAverageActivities(activities, nbDaysForAveraging);

	downloadAsJson(activities, "activities");
	downloadAsJson(averageActivities, "averageActivities");
}