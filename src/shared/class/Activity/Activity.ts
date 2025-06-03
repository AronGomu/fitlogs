import type { ChartItem } from "chart.js/auto";
import { ChartParameter } from "../../functions/Chart";
import { createActivityDateFromDate, type ActivityDate } from "./ActivityDate";

export class Activity {
    constructor(public year: number, public month: number, public day: number, public weight: number | null, public calories: number | null, public steps: number | null) { }

    public printDate(): string {
        return `${this.year}-${this.month}-${this.day}`;
    }

    public getDate(): Date {
        return new Date(this.printDate());
    }

    public getActivityDate(): ActivityDate {
        return createActivityDateFromDate(this.getDate());
    }
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(activity.year, activity.month, activity.day, activity.weight, activity.calories, activity.steps);
}

/** Create the labels and all data arrays for charts. */
export function createAxesForChart(chartItem: ChartItem, activities: Activity[]): ChartParameter {
    const lList: string[] = [];
    const wList: number[] = [];
    const cList: number[] = [];
    const sList: number[] = [];

    let minWeight: number = Number.MAX_SAFE_INTEGER;
    let maxWeight: number = Number.MIN_SAFE_INTEGER;
    let minCalories: number = Number.MAX_SAFE_INTEGER;
    let maxCalories: number = Number.MIN_SAFE_INTEGER;
    let minSteps: number = Number.MAX_SAFE_INTEGER;
    let maxSteps: number = Number.MIN_SAFE_INTEGER;
    
    for (let i = 0; i < activities.length; i++) {
        const a = activities[i];
        lList.push(a.printDate());
        wList.push(a.weight);
        cList.push(a.calories);
        sList.push(a.steps);

        if (a.weight > maxWeight) maxWeight = a.weight;
        if (a.weight < minWeight) minWeight = a.weight;
        if (a.calories > maxCalories) maxCalories = a.calories;
        if (a.calories < minCalories) minCalories = a.calories;
        if (a.steps > maxSteps) maxSteps = a.steps;
        if (a.steps < minSteps) minSteps = a.steps;
    }

    minWeight -= 2;
    maxWeight += 2;
    minCalories -= 300;
    maxCalories += 300;
    minSteps -= 3000;
    maxSteps += 3000;

    return new ChartParameter(
        chartItem,
        lList, wList, cList, sList,
        minWeight, maxWeight, minCalories, maxCalories, minSteps, maxSteps,
    )
}

