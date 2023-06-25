import { writable, type Writable } from 'svelte/store';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import { WeightMetrics } from '../enum/WeightMetrics';
import { createWorkoutFromWorkout, Workout } from '../class/Workout';
import { getClassName, parseJsonArrayToObjectArray, parseJsonToObject } from '../functions/Utilitary';
import { Exercice } from '../class/Exercice';
import { Set } from '../class/Set';
import { Weight } from '../class/Weight';

/** Workouts data directly extracted from the local storage, its a list of untyped object using Workout as an interface. */

let wd: Workout[] = JSON.parse(localStorage.getItem(LocalStorageKeys.WorkoutsData));

// Set the dates of the workouts to be Date and not strings
wd.forEach(w => {
    w.creation = new Date(w.creation);
    w.lastModification = new Date(w.lastModification);
    for (let i = 0; i < w.exercices.length; i++) {
        const e = w.exercices[i];
        for (let j = 0; j < e.sets.length; j++) {
            let s = e.sets[j];
            s.weight = new Weight(s.weight.weight, s.weight.metric) 
            e.sets[j] = new Set(s.id, s.repetitions, s.weight, s.isOpen);
        }
        w.exercices[i] = new Exercice(e.name, e.sets, e.isOpen);
    }
});

console.log(getClassName(wd[0].exercices));
console.log(getClassName(wd[0].exercices[0]));
console.log(getClassName(wd[0].exercices[0].sets));
console.log(wd[0].exercices[0].sets);

// console.log(getClassName(wd[0].exercices[0].sets[0]));
// console.log(getClassName(wd[0].exercices[0].sets[0].weight));
// console.log(getClassName(wd[0].exercices[0].sets[0].weight.weight));
// console.log(getClassName(wd[0].exercices[0].sets[0].weight.metric));




/** Writable that store all the workouts in a list ordered by their creation date starting with the most recent workouts to the oldest. */
export const workoutsData: Writable<Workout[]> = writable(wd);

export function getWorkoutData() {

}

/** Save a workout being modified into the database of all workouts in the app. */
export async function saveWorkout(newW: Workout) {
    
    return await workoutsData.update((workouts: Workout[]) => {
        console.log("Save workout in subscribe");
        console.log(newW);
        
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

    })
}

export async function saveWorkoutData(wd: Workout[]) {
    workoutsData.set(wd);
    localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(wd));
}

export async function deleteWorkoutData() {
    workoutsData.set(null);
    localStorage.setItem(LocalStorageKeys.WorkoutsData, JSON.stringify(null));
}