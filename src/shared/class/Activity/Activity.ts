import { getActivityListFromDB } from "../../database/ActivityDatabase";
import { downloadAsJson, truncateNumber } from "../../functions/utils";

export class Activity {
    constructor(
        public date: number,
        public weight: number = 0,
        public calories: number = 0,
        public steps: number = 0
    ) { }

    public getDate(): Date { return new Date(this.date) }

    public printDate(): string {
        const d = this.getDate();
        const year = d.getFullYear();
        const month = d.getMonth()-1;
        const day = d.getDay();
        return `${year}-${month}-${day}`;
    }
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(activity.date, activity.weight, activity.calories, activity.steps);
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