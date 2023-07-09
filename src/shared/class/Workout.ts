import { setObjectFromObject } from "../functions/Utilitary";
import type { Exercice } from "./Exercice";

export class Workout {
    
    constructor(
        /** Date of the creation of the workout. Used as id here to differentiate with other workouts. */
        public c: Date = new Date(),
        /** Last date were the workout is completed and saved. */
        public lm: Date = new Date(),
        /** Exercice List of the workout. */
        public el: Exercice[] = []
    ) {}
    
    /** Return 0 that represent if the workouts are the same (if same date of creation), -1 if the workout was created before, 1 if created after. */
    compareWorkout(w: Workout): number {
        if (w.c == this.c) return 0;
        else if (w.c > this.c) return -1;
        else return 1;
    }
}
