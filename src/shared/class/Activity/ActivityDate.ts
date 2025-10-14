export class ActivityDate {
    public constructor(public year: number, public month: number, public day: number) { }

    formatDate(): string {
        return `${this.year}-${this.month}-${this.day}`;
    }

    public toDate(): Date {
        return new Date(`${this.year}-${this.month}-${this.day}`);
    }

    
}

export function formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}

export function getRealActivityDate(activityDate: ActivityDate): ActivityDate {
    return new ActivityDate(activityDate.year, activityDate.month, activityDate.day);
}


export function createActivityDateFromDate(d: Date): ActivityDate {
	return new ActivityDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
}