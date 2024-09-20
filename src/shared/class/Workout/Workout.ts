import { Lift } from "../Lift/Lift";
import { RepRange } from "../Program/RepRange";
import { Exercice, getRealExercice } from "./Exercice";
import { WorkoutDate, getRealWorkoutDate } from "./WorkoutDate";

/** Represent a workout session. */
export class Workout {
    constructor(
        // DATA VARIABLES
        /** Date of the creation of the workout. Used as id here to differentiate with other workouts. */
        public createdAt: WorkoutDate,
        /** Exercice List of the workout. */
        public el: Exercice[],
    ) { }

    getKey() {
        if (!this.createdAt) {
            throw new Error(`Cannot create key if createdAt property is null !`)
        }

        return this.createdAt.convertToKey();
    }

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
        console.log("addNewExercice")
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

    if (!w.el) return new Workout(realCreatedAt, []);

    // loop through all the exercices
    for (let i = 0; i < w.el.length; i++) {
        w.el[i] = getRealExercice(w.el[i]);
    }

    const realWorkout = new Workout(realCreatedAt, w.el);
    for (let i = 0; i < realWorkout.el.length; i++) {
        const e = realWorkout.el[i];
        // await e.checkIfItsNewLift()
    }

    return realWorkout;
}

export function compareWorkouts(w1: Workout, w2: Workout): number {
        const w1Date = w1.createdAt.getDate();
        const w2Date = w2.createdAt.getDate();
        if (w1Date == w2Date) return 0;
        else if (w1Date > w2Date) return -1;
        else return 1;
    }
