export class Activity {
    constructor(public year: number, public month: number, public day: number, public weight: number | null, public calories: number | null, public steps: number | null) { }

    public printDate(): string {
        return `${this.year}-${this.month}-${this.day}`;
    }
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(activity.year, activity.month, activity.day, activity.weight, activity.calories, activity.steps);
}

/** Create the labels and all data arrays for charts. */
export function createAxesForChart(activities: Activity[]): { 
    lList: string[]; wList: number[]; cList: number[]; sList: number[]; 
    minCalories: number, maxCalories: number,
} {
    const lList: string[] = [];
    const wList: number[] = [];
    const cList: number[] = [];
    const sList: number[] = [];
    
    for (let i = 0; i < activities.length; i++) {
        const a = activities[i];
        lList.push(a.printDate());
        wList.push(a.weight);
        cList.push(a.calories);
        sList.push(a.steps);
    }

    return { lList, wList, cList, sList }
}
