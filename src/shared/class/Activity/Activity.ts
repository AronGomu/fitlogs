export class Activity {
    constructor(public year: number, public month: number, public day: number, public weight: number | null, public calories: number | null, public steps: number | null) { }

    public printDate(): string {
        return `${this.year}-${this.month}-${this.day}`;
    }
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(activity.year, activity.month, activity.day, activity.weight, activity.calories, activity.steps);
}
