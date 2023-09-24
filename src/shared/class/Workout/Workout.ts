import { Lift } from "../Lift/Lift";
import { RepRange } from "../Program/RepRange";
import { Exercice, getRealExercice } from "./Exercice";
import { Serie } from "./Serie";
import { Weight } from "./Weight";
import { WorkoutDate, getRealWorkoutDate } from "./WorkoutDate";

/** Represent a workout session. */
export class Workout {
    constructor(
        // DATA VARIABLES
        /** Id generated in the database. */
        public id: number,
        /** Date of the creation of the workout. Used as id here to differentiate with other workouts. */
        public createdAt: WorkoutDate = new WorkoutDate(),
        /** Exercice List of the workout. */
        public el: Exercice[],

        // GUI VARIABLES
        /** Boolean flag to know if the accordeon is open or not. */
        public isSelfOpen: boolean,
    ) { }

    /** Return 0 that represent if the workouts are the same (if same date of creation), -1 if the workout was created before, 1 if created after. */
    compareWorkout(w: Workout): number {
        const w1Date = w.createdAt.getDate();
        const w2Date = this.createdAt.getDate();
        if (w1Date == w2Date) return 0;
        else if (w1Date > w2Date) return -1;
        else return 1;
    }

    /** Add a new empty exercice to both exercice list. */
    addNewExercice() {
        const newExercice: Exercice = new Exercice(
            new Lift(),
            [],
            '',
            new RepRange(null, null),
            false,
            false
        );
        this.el.push(newExercice);
    }
}


/** Create a real workout object and assign the values from the one fetched. */
export function getRealWorkout(w: Workout): Workout {
    const realCreatedAt: WorkoutDate = getRealWorkoutDate(w.createdAt);

    if (!w.el) return new Workout(w.id, realCreatedAt, [], w.isSelfOpen);

    // loop through all the exercices
    for (let i = 0; i < w.el.length; i++) {
        w.el[i] = getRealExercice(w.el[i]);
    }

    return new Workout(w.id, realCreatedAt, w.el, w.isSelfOpen);
}
