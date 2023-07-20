import { writable, type Writable } from 'svelte/store';
import { getRealEs, Lift } from '../class/Lift';
import { load } from '../data/ExerciceSuggestionsBase';
import { addToDatabase, getAllFromDatabase, StoreName, updateInDatabase } from '../functions/Database';
import { isArrayWithElements } from '../functions/Utilitary';


// FROM WORKOUT DATA WAY
/** Exercice suggestions in inputs of form. */
export let lifts: Writable<Lift[]> = writable(<Lift[]> []);

loadEsl();

/** Load the list of Exercice Suggestion. */
function loadEsl() {
    getAllFromDatabase<Lift>(StoreName.LIFT).then(fakeEsl => {
        // It there is nothing in the database, we load the base suggestions and retry to load the ll from the database
        if (!isArrayWithElements(fakeEsl)) {
            load().then(() => loadEsl());
        }
        
        console.log(fakeEsl);
        
        let realEsl = [];
        for (const fakeEs of fakeEsl) realEsl.push(getRealEs(fakeEs));
        lifts.set(realEsl);
    })
}


// LOCAL STORAGE WAY
/** Exercice suggestions in inputs of form. */
// export const exerciceSuggestions: Writable<string[]> = writable(<string[]> JSON.parse(get(LocalStorageKeys.Suggestions)));

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export async function addSuggestion(newEs: Lift) {

    if (newEs.id) throw new Error("Cannot add Lift if it already has an id.");

    addToDatabase(StoreName.LIFT, newEs).then(addedEs => {
        getAllFromDatabase<Lift>(StoreName.LIFT).then(fetchedEsl => {
            lifts.set(fetchedEsl);
        })
    });
}

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
* @param s1 Suggestion value trying to be added.
*/
export async function updateSuggestion(newEs: Lift) {
    if (!newEs.id) throw new Error("Cannot update Lift if it has no id.");

    updateInDatabase(StoreName.LIFT, newEs.id, newEs).then(updateEs => {
        getAllFromDatabase<Lift>(StoreName.LIFT).then(fetchedEsl => {
            lifts.set(fetchedEsl);
        })
    });
}