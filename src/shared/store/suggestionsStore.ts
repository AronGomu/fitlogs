import { writable, type Writable } from 'svelte/store';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import { workoutsData } from './saveStore';
import type { Workout } from '../class/Workout';
import { removeDuplicates } from '../functions/Utilitary';

// FROM WORKOUT DATA WAY
/** Exercice suggestions in inputs of form. */
export let exerciceSuggestions: Writable<string[]> = writable(<string[]> []);

await workoutsData.subscribe((workouts: Workout[]) => {
    let allExercices: string[] = [];
    for (const w of workouts) {
        for (const e of w.exercices) {
            allExercices.push(e.name);
        }
    }

    exerciceSuggestions = writable(<string[]> removeDuplicates(allExercices));
})


// LOCAL STORAGE WAY
/** Exercice suggestions in inputs of form. */
// export const exerciceSuggestions: Writable<string[]> = writable(<string[]> JSON.parse(localStorage.getItem(LocalStorageKeys.Suggestions)));

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export function addSuggestion(s1: string) {
    s1 = s1.toLowerCase();

    exerciceSuggestions.update((suggestions: string[]) => {
        
        if (!suggestions.find((s2: string) => s2 === s1)) {
            suggestions.push(s1);
            localStorage.setItem(LocalStorageKeys.Suggestions, JSON.stringify(suggestions));
        }

        return suggestions;
    });


}