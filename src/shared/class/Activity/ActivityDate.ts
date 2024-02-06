export class ActivityDate {
    public constructor(public year: number, public month: number, public day: number) { }

    public toDate(): Date {
        return new Date(`${this.year}-${this.month}-${this.day}`);
    }

    public formatDate(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    }
}

export function getRealActivityDate(activityDate: ActivityDate): ActivityDate {
    return new ActivityDate(activityDate.year, activityDate.month, activityDate.day);
}
