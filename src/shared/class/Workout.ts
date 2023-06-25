import { setObjectFromObject } from "../functions/Utilitary";
import type { Exercice } from "./Exercice";

export class Workout {
    /** Date of the creation of the workout. Used as id here to differentiate with other workouts. */
    public creation: Date = new Date();
    /** Last date were the workout is completed and saved. */
    public lastModification: Date = new Date();
    /** List of the exercices of the workout. */
    public exercices: Exercice[] = [];
    
    constructor() {}
}

export function createWorkoutFromWorkout(w: Workout): Workout {
    return setObjectFromObject(w, new Workout());
}