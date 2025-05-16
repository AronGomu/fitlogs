import { writable, type Writable } from "svelte/store";
import { addToDatabase, getAllFromDatabase, updateInDatabase } from "../functions/Database";
import { getRealProgram, type Program } from "../class/Program/Program";

// FROM WORKOUT DATA WAY
/** Exercice suggestions in inputs of form. */
export let programs: Writable<Program[]> = writable(<Program[]>[]);

loadProgram();

/** Load the list of programs stored locally. */
function loadProgram() {
  getAllFromDatabase<Program>("program-store").then((fakePl) => {
    let realPl = [];

    for (const fakeProgram of fakePl) realPl.push(getRealProgram(fakeProgram));
    programs.set(realPl);
  });
}

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
 * @param s1 Suggestion value trying to be added.
 */
export async function addProgram(newProgram: Program) {
  if (newProgram.id) throw new Error("Cannot add Program if it already has an id.");

  addToDatabase("program-store", newProgram).then((addedProgram) => {
    getAllFromDatabase<Program>("program-store").then((fetchedPl) => {
      programs.set(fetchedPl);
    });
  });
}

/** Try to add a new suggestion to the suggestion store. It verify the non existence and then proceed to add it to the current value and save it in the local storage.
 * @param s1 Suggestion value trying to be added.
 */
export async function updateProgram(newProgram: Program) {
  if (!newProgram.id) throw new Error("Cannot update Program if it has no id.");

  updateInDatabase("lift-store", newProgram.id, newProgram).then((updatedProgram) => {
    getAllFromDatabase<Program>("program-store").then((fetchedPl) => {
      programs.set(fetchedPl);
    });
  });
}
