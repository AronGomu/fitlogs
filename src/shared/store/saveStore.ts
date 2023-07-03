// import { writable, type Writable } from 'svelte/store';
// import { Exercice } from '../class/Exercice';
// import { Set } from '../class/Set';
// import { Weight } from '../class/Weight';
// import { Workout } from '../class/Workout';
// import { LocalStorageKeys } from '../enum/LocalStorageKeys';

import { type Writable, writable } from "svelte/store";
import type { Workout } from "../class/Workout";
import { LocalStorageKeys } from "../enum/LocalStorageKeys";
import { Exercice } from "../class/Exercice";
import { Serie } from "../class/Serie";
import { Weight } from "../class/Weight";

// /** Workouts data directly extracted from the local storage, its a list of untyped object using Workout as an interface. */

let wd: Workout[] = JSON.parse(localStorage.getItem(LocalStorageKeys.WorkoutsData));

// Set the dates of the workouts to be Date and not strings
if (wd) {
    wd.forEach(w => {
        w.creation = new Date(w.creation);
        w.lastModification = new Date(w.lastModification);
        for (let i = 0; i < w.exercices.length; i++) {
            const e = w.exercices[i];
            for (let j = 0; j < e.sets.length; j++) {
                let s = e.sets[j];
                s.weight = new Weight(s.weight.weight, s.weight.metric) 
                e.sets[j] = new Serie(s.id, s.repetitions, s.weight, s.isOpen);
            }
            w.exercices[i] = new Exercice(e.name, e.sets, e.isOpen);
        }
    });
}

// /** Writable that store all the workouts in a list ordered by their creation date starting with the most recent workouts to the oldest. */
export const workoutsData: Writable<Workout[]> = writable(wd);

export function getWorkoutData() {

}

/** Save a workout being modified into the database of all workouts in the app. */
export function saveWorkout(newW: Workout) {
    
    workoutsData.update((workouts: Workout[]) => {
        if (!newW) throw new Error("From saveWorkout : newW is null !!!");
        if (!newW.creation) throw new Error("From saveWorkout : newW.creation is null !!!");
        
        // there is no workouts in the database
        if (!workouts || workouts.length < 1) {
            localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify([newW]))
            return [newW];
        }

        // loop into all the workouts from the most recent and find the workout to update
        for (let i = 0; i < workouts.length; i++) {
            // if the workout has been found in the list
            if (newW.creation == workouts[i].creation) {
                workouts[i] = newW;
                localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(workouts))
                return workouts;
            }

            // its a new workout because all other workouts forward in the list are older
            if (newW.creation > workouts[i].creation) {
                workouts.splice(i, 0, newW);
                localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(workouts))
                return workouts;
            }
        }
        // add the value at the end of the list as the oldest workouts
        workouts.push(newW);
        localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(workouts));
    });
}

export async function saveWorkoutData(wd: Workout[]) {
    workoutsData.set(wd);
    localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(wd));
}

export async function deleteWorkoutData() {
    workoutsData.set(null);
    localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(null));
}