import { getActivityListFromDB } from "../../database/ActivityDatabase";
import { downloadAsJson, truncateNumber } from "../../functions/Utils";
import { formatDateToYYYYMMDDNumber } from "../../functions/UtilsDate";

export class Activity {
    constructor(
        public date: number,
        public weight: number = 0,
        public calories: number = 0,
        public steps: number = 0
    ) { }

    public getDate() { return new Date(this.date) }

    public printDateSlash() {
        const dateString = String(this.date);
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${day}/${month}/${year}`;
    }

    public printDateDash(): string {
        const dateString = String(this.date);
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${day}-${month}-${year}`;
    }
}

export function buildActivityWithDate(date: Date, weight = 0, calories = 0, steps = 0) {
    return new Activity(formatDateToYYYYMMDDNumber(date), weight, calories, steps)
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(
        Number(activity.date), 
        Number(activity.weight), 
        Number(activity.calories), 
        Number(activity.steps)
    );
}


export function buildAverageActivityList(nbDaysUsedForAverage = 7, activityList) {

	let activityAverageList: Activity[] = [];

	for (let i = 0; i < activityList.length; i++) {
		activityAverageList.push(getAverageActivity(activityList, nbDaysUsedForAverage, i));
	}

	return activityAverageList;
}

export type AverageProperty = "calories" | "weight" | "steps";


export function getAverageActivity(activityList, nbDaysUsedForAverage, i) {

	let activityToAverage = activityList[i];
	let totalCalories = 0; let totalWeight = 0; let totalSteps = 0;
	let nbElementCalories = 0; let nbElementWeight = 0; let nbElementSteps = 0;

	for (let j = 0; j < nbDaysUsedForAverage; j++) {
		if (!activityList[i-j]) break;

        if (activityList[i-j].calories) {
            nbElementCalories++;
            totalCalories += activityList[i-j].calories;
        }

        if (activityList[i-j].weight) {
            nbElementWeight++;
            totalWeight += activityList[i-j].weight;
        }

        if (activityList[i-j].steps) {
            nbElementSteps++;
            totalSteps += activityList[i-j].steps;
        }
	}

	return new Activity(
		activityToAverage.date,
		truncateNumber(totalWeight/nbElementWeight, 1),
		truncateNumber(totalCalories/nbElementCalories, 0),
		truncateNumber(totalSteps/nbElementSteps, 0),
	)
}

export async function exportActivityList(nbDaysUsedForAverage) {
	const ActivityList = await getActivityListFromDB();

	const averageActivityList = buildAverageActivityList(nbDaysUsedForAverage, ActivityList);

	downloadAsJson(ActivityList, "ActivityList");
	downloadAsJson(averageActivityList, "averageActivityList");
}