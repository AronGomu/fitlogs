// import { writable, type Writable } from 'svelte/store';
// import { Exercice } from '../class/Exercice';
// import { Set } from '../class/Set';
// import { Weight } from '../class/Weight';
// import { Workout } from '../class/Workout';
// import { LocalStorageKeys } from '../enum/LocalStorageKeys';

import { type Writable, writable } from "svelte/store";
import { Workout } from "../class/Workout";
import { Keys } from "../enum/Keys";
import { Exercice } from "../class/Exercice";
import { Serie } from "../class/Serie";
import { Weight } from "../class/Weight";
import { get, set } from "idb-keyval";
import type { WorkoutGUI } from "../class/WorkoutGUI";

/** Writable that store all the workouts in a list ordered by their creation date starting with the most recent workouts to the oldest. */
export var workoutsData: Writable<Workout[]> = writable([]);




fetchWorkoutData();


/** Fetch the data of all the workouts in the storage and convert the stringify data into real objects. */
function fetchWorkoutData() {
    get(Keys.WorkoutsData).then((wd: Workout[]) => {
        let realWd: Workout[] = [];

        // Set the dates of the workouts to be Date and not strings
        if (wd) {
            wd.forEach(w => {
                let realWorkout: Workout = new Workout(w.c, w.lm);

                // loop through all the exercices
                for (let i = 0; i < w.el.length; i++) {
                    let realExercice: Exercice = new Exercice(w.el[i].n, []);
                    const e = w.el[i];
                    for (let j = 0; j < e.sl.length; j++) {
                        let realWeight: Weight = new Weight(e.sl[j].w.weight, e.sl[j].w.metric);
                        let realSerie: Serie = new Serie(e.sl[j].r, e.sl[j].rn, realWeight);
                        realExercice.sl.push(realSerie);
                    }
                    realWorkout.el.push(realExercice);
                }
                realWd.push(realWorkout);
            });

            workoutsData.set(realWd);

            workoutsData.update((wd) => {console.log(wd); return wd;});
            
        }
    });
}

/** Save a workout being modified into the database of all workouts in the app. */
export function saveWorkout(newW: Workout) {

    workoutsData.update((workouts: Workout[]) => {
        if (!newW) throw new Error("From saveWorkout : newW is null !!!");
        if (!newW.c) throw new Error("From saveWorkout : newW.creation is null !!!");
        
        // there is no workouts in the database
        if (!workouts || workouts.length < 1) {
            set(Keys.WorkoutsData, [newW]);
            return [newW];
        }

        // loop into all the workouts from the most recent and find the workout to update
        for (let i = 0; i < workouts.length; i++) {
            // if the workout has been found in the list
            if (newW.c == workouts[i].c) {
                workouts[i] = newW;
                set(Keys.WorkoutsData, workouts);
                return workouts;
            }
            
            // its a new workout because all other workouts forward in the list are older
            if (newW.c > workouts[i].c) {
                workouts.splice(i, 0, newW);
                set(Keys.WorkoutsData, workouts);
                return workouts;
            }
        }


        // add the value at the end of the list as the oldest workouts
        workouts.push(newW);
        set(Keys.WorkoutsData, workouts);
        return workouts;
    });
}


export async function saveWorkoutData(wd: Workout[]) {
    workoutsData.set(wd);
    set(Keys.WorkoutsData, wd);
}

export async function deleteWorkoutData() {
    workoutsData.set(null);
    set(Keys.WorkoutsData, null);
}