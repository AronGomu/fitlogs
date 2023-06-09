import { writable, type Writable } from 'svelte/store';
import { Keys } from '../enum/Keys';
import { workoutsData } from './saveStore';
import type { Workout } from '../class/Workout';
import { removeDuplicates } from '../functions/Utilitary';
import { set } from 'idb-keyval';

// FROM WORKOUT DATA WAY
/** Exercice suggestions in inputs of form. */
export let exerciceSuggestions: Writable<string[]> = writable(<string[]> []);

if (workoutsData) {
    workoutsData.subscribe((workouts: Workout[]) => {

        if (!workouts || workouts.length < 1) return;
        
        let allExercices: string[] = [];
        for (const w of workouts) {
            for (const e of w.el) {
                if (e && e.n) allExercices.push(e.n);
            }
        }
    
        exerciceSuggestions = writable(<string[]> removeDuplicates(allExercices));
    })
}


// LOCAL STORAGE WAY
/** Exercice suggestions in inputs of form. */
// export const exerciceSuggestions: Writable<string[]> = writable(<string[]> JSON.parse(get(LocalStorageKeys.Suggestions)));

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export function addSuggestion(s1: string) {
    s1 = s1.toLowerCase();

    exerciceSuggestions.update((suggestions: string[]) => {
        
        if (!suggestions.find((s2: string) => s2 === s1)) {
            suggestions.push(s1);
            set(Keys.Suggestions, suggestions);
        }

        return suggestions;
    });


}