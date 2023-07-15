import { ExerciceSuggestion } from "../class/ExerciceSuggestion";
import { MuscleWork } from "../class/MuscleWork";
import { Muscle } from "../enum/Muscle";
import { StoreName, addToDatabase } from "../functions/Database";

const ExerciceSuggestionsBase: ExerciceSuggestion[] = [
    new ExerciceSuggestion(null, "Squat", "Low bar", [
        new MuscleWork(Muscle.Quad, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Hamstring, 10),
        new MuscleWork(Muscle.Erector, 10)
    ]),
    new ExerciceSuggestion(null, "Squat", "High bar", [
        new MuscleWork(Muscle.Quad, 60),
        new MuscleWork(Muscle.Glute, 20),
        new MuscleWork(Muscle.Hamstring, 10),
        new MuscleWork(Muscle.Erector, 10)
    ]),
    new ExerciceSuggestion(null, "Bench Press", "Standard", [
        new MuscleWork(Muscle.Chest, 60),
        new MuscleWork(Muscle.DeltFront, 20),
        new MuscleWork(Muscle.Triceps, 20),
    ]),
    new ExerciceSuggestion(null, "Bench Press", "Close Grip", [
        new MuscleWork(Muscle.Triceps, 50),
        new MuscleWork(Muscle.Chest, 30),
        new MuscleWork(Muscle.DeltFront, 20),
    ]),
    new ExerciceSuggestion(null, "Deadlift", "Standard", [
        new MuscleWork(Muscle.Erector, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Hamstring, 20),
    ]),
    new ExerciceSuggestion(null, "Deadlift", "Romanian", [
        new MuscleWork(Muscle.Hamstring, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Erector, 20),
    ])
]

export async function load() {
    for (const es of ExerciceSuggestionsBase) {
        const addedEs = await addToDatabase(StoreName.SUGGESTION_STORE, es);
        console.log(addedEs);
    }
}