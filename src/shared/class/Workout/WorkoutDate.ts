export class WorkoutDate {

    constructor(
        public year: number,
        public month: number,
        public day: number,
    ) {
        const currentDate = new Date();
        if (!year && !month && !day) {
            this.year = currentDate.getFullYear();
            this.month = currentDate.getMonth();
            this.day = currentDate.getDate();
        }

        if (!year) {
            throw new Error("Year is missing !")
        }

        if (!month) {
            throw new Error("Month is missing !")
        }

        if (!day) {
            throw new Error("Day is missing !")
        }
    }

    public compare(wd: WorkoutDate): boolean {
        if (this.day != wd.day) return false;
        if (this.month != wd.month) return false;
        if (this.year != wd.year) return false;
        return true;
    }

    public getDate(): Date {
        return new Date(this.year, this.month, this.day);
    }

    public hasBeenCreatedToday(): boolean {
        if (JSON.stringify(this.getDate()) ===
            JSON.stringify(new WorkoutDate(null, null, null).getDate())) return true;
        return false;
    }
}

export function getRealWorkoutDate(wd: WorkoutDate): WorkoutDate {
    return new WorkoutDate(
        wd.day,
        wd.month,
        wd.year
    );
}

export function createWorkoutDateFromDate(d: Date): WorkoutDate {
    if (!d) return null;
    return new WorkoutDate(d.getFullYear(), d.getMonth(), d.getDate());
}
