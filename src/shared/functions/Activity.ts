import { Activity } from "../class/Activity/Activity";
import { getActivitiesFromDatabase } from "./Database";
import { downloadAsJson, truncateNumber } from "./Utilitary";


export function buildAverageActivityList(activities: Activity[], nbDays: number): Activity[] {
	let r: Activity[] = [];

	if (nbDays > activities.length) nbDays = activities.length;

	let averageCalories: number;
	let averageWeight: number;
	let averageSteps: number;

	for (let i = 0; i < nbDays; i++) {
		const a = activities[i];

		averageCalories = truncateNumber(getAverage(activities, nbDays, "calories", i), 0,);
		averageWeight = truncateNumber(getAverage(activities, nbDays, "weight", i), 1,);
		averageSteps = truncateNumber(getAverage(activities, nbDays, "steps", i), 0,);

		const newA = new Activity( a.year, a.month, a.day, averageWeight, averageCalories, averageSteps);
		r.push(newA);
	}

	return r;
}

export type AverageProperty = "calories" | "weight" | "steps";
export function getAverage(
	activities: Activity[],
	nbDays: number,
	propertyName: AverageProperty,
	nbDaysBefore: number,
): number {
	if (!activities || activities.length < 1) return 0;

	let total: number = 0;
	let nbElements: number = 0;

	let startingDay = 0 + nbDaysBefore;
	let len = nbDays + nbDaysBefore;

	if (startingDay > activities.length) return 0;
	if (len > activities.length) len = activities.length;

	for (let i = startingDay; i < len; i++) {
		const a = activities[i];
		if (!a) continue;
		if (!a[propertyName]) continue;

		total += a[propertyName];
		nbElements += 1;
	}

	return total / nbElements;
}

export async function exportActivities() {
	const activities = await getActivitiesFromDatabase();

	const averageActivities = buildAverageActivityList(activities, activities.length - 1);

	downloadAsJson(activities, "activities");
	downloadAsJson(averageActivities, "averageActivities");
}
