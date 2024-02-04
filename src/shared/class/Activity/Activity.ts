export class Activity {
    constructor(public year: number, public month: number, public day: number, public weight: number, public calories: number, public steps: number) { }
}

export function getRealActivity(activity: Activity): Activity {
    return new Activity(activity.year, activity.month, activity.day, activity.weight, activity.calories, activity.steps);
}
