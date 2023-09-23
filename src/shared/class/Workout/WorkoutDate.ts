/** Represents the date of a workout. */
export class WorkoutDate {

    /** Creates a new instance of WorkoutDate.
     * @param {number} year - The year of the workout date.
     * @param {number} month - The month of the workout date.
     * @param {number} day - The day of the workout date.*/
    constructor(
        /** The day of the workout date.*/
        public day?: number,
        /** The month of the workout date.*/
        public month?: number,
        /** The year of the workout date. */
        public year?: number,
    ) {
        const currentDate = new Date();
        if (!year) this.year = currentDate.getFullYear();
        if (!month) this.month = currentDate.getMonth();
        if (!day) this.day = currentDate.getDate();
    }

    /**
     * Converts the provided year, month, and day to a formatted date string.
     * @param {number} year - The year of the date.
     * @param {number} month - The month of the date (0-based, January is 0).
     * @param {number} day - The day of the date.
     * @returns {string} - The formatted date string.
     */
    public getDate(): Date {
        return new Date(this.year, this.month, this.day);
    }
}


export function getRealWorkoutDate(wd: WorkoutDate): WorkoutDate {
    return new WorkoutDate(
        wd.day,
        wd.month,
        wd.year
    );

}
