import { writable, type Writable } from 'svelte/store';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import { WeightMetrics } from '../enum/WeightMetrics';
import type { Workout } from '../class/Workout';

/** Writable that store all the workouts in a list ordered by their creation date starting with the most recent workouts to the oldest. */
export const workoutData: Writable<Workout[]> = writable(<Workout[]> JSON.parse(localStorage.getItem(LocalStorageKeys.WorkoutData)));

export function getWorkoutData() {

}

/** Save a workout being modified into the database of all workouts in the app. */
export async function saveWorkout(newW: Workout) {
    
    return await workoutData.update((workouts: Workout[]) => {
        console.log("Save workout in subscribe");
        console.log(newW);
        
        if (!newW) throw new Error("From saveWorkout : newW is null !!!");
        if (!newW.creation) throw new Error("From saveWorkout : newW.creation is null !!!");
        
        // there is no workouts in the database
        if (!workouts || workouts.length < 1) {
            localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify([newW]))
            return [newW];
        }

        // loop into all the workouts from the most recent and find the workout to update
        for (let i = 0; i < workouts.length; i++) {
            // if the workout has been found in the list
            if (newW.creation == workouts[i].creation) {
                workouts[i] = newW;
                localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify(workouts))
                return workouts;
            }

            // its a new workout because all other workouts forward in the list are older
            if (newW.creation > workouts[i].creation) {
                workouts.splice(i, 0, newW);
                localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify(workouts))
                return workouts;
            }
        }
        // add the value at the end of the list as the oldest workouts
        workouts.push(newW);
        localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify(workouts));

    })
}

export async function saveWorkoutData(wd: Workout[]) {
    workoutData.set(wd);
    localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify(wd));
}

export async function deleteWorkoutData() {
    workoutData.set(null);
    localStorage.setItem(LocalStorageKeys.WorkoutData, JSON.stringify(null));
}