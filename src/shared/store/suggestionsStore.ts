import { writable, type Writable } from 'svelte/store';
import { ExerciceSuggestion, getRealEs } from '../class/ExerciceSuggestion';
import { addToDatabase, getAllFromDatabase, StoreName, updateInDatabase } from '../functions/Database';
import { isArrayWithElements } from '../functions/Utilitary';
import { load } from '../data/ExerciceSuggestionsBase';

//TODO implements suggestions

// FROM WORKOUT DATA WAY
/** Exercice suggestions in inputs of form. */
export let exerciceSuggestions: Writable<ExerciceSuggestion[]> = writable(<ExerciceSuggestion[]> []);

loadEsl();

/** Load the list of Exercice Suggestion. */
function loadEsl() {
    getAllFromDatabase<ExerciceSuggestion>(StoreName.SUGGESTION_STORE).then(fakeEsl => {
        // It there is nothing in the database, we load the base suggestions and retry to load the esl from the database
        if (!isArrayWithElements(fakeEsl)) {
            load().then(() => loadEsl());
        }
    
        let realEsl = [];
        for (const fakeEs of fakeEsl) realEsl.push(getRealEs(fakeEs));
        exerciceSuggestions.set(realEsl);
    })
}


// LOCAL STORAGE WAY
/** Exercice suggestions in inputs of form. */
// export const exerciceSuggestions: Writable<string[]> = writable(<string[]> JSON.parse(get(LocalStorageKeys.Suggestions)));

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export async function addSuggestion(newEs: ExerciceSuggestion) {

    if (newEs.id) throw new Error("Cannot add ExerciceSuggestion if it already has an id.");

    addToDatabase(StoreName.SUGGESTION_STORE, newEs).then(addedEs => {
        getAllFromDatabase<ExerciceSuggestion>(StoreName.SUGGESTION_STORE).then(fetchedEsl => {
            exerciceSuggestions.set(fetchedEsl);
        })
    });
}

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export async function updateSuggestion(newEs: ExerciceSuggestion) {

    if (!newEs.id) throw new Error("Cannot update ExerciceSuggestion if it has no id.");

    updateInDatabase(StoreName.SUGGESTION_STORE, newEs.id, newEs).then(updateEs => {
        getAllFromDatabase<ExerciceSuggestion>(StoreName.SUGGESTION_STORE).then(fetchedEsl => {
            exerciceSuggestions.set(fetchedEsl);
        })
    });
}