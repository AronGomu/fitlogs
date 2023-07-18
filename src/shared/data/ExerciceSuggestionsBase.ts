import { Lift } from "../class/Lift";
import { MuscleWork } from "../class/MuscleWork";
import { Muscle } from "../enum/Muscle";
import { StoreName, addToDatabase } from "../functions/Database";

const ExerciceSuggestionsBase: Lift[] = [
    new Lift(null, "Squat", "Low bar", [
        new MuscleWork(Muscle.Quad, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Hamstring, 10),
        new MuscleWork(Muscle.Erector, 10)
    ]),
    new Lift(null, "Squat", "High bar", [
        new MuscleWork(Muscle.Quad, 60),
        new MuscleWork(Muscle.Glute, 20),
        new MuscleWork(Muscle.Hamstring, 10),
        new MuscleWork(Muscle.Erector, 10)
    ]),
    new Lift(null, "Bench Press", "Standard", [
        new MuscleWork(Muscle.Chest, 60),
        new MuscleWork(Muscle.DeltFront, 20),
        new MuscleWork(Muscle.Triceps, 20),
    ]),
    new Lift(null, "Bench Press", "Close Grip", [
        new MuscleWork(Muscle.Triceps, 50),
        new MuscleWork(Muscle.Chest, 30),
        new MuscleWork(Muscle.DeltFront, 20),
    ]),
    new Lift(null, "Deadlift", "Standard", [
        new MuscleWork(Muscle.Erector, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Hamstring, 20),
    ]),
    new Lift(null, "Deadlift", "Romanian", [
        new MuscleWork(Muscle.Hamstring, 50),
        new MuscleWork(Muscle.Glute, 30),
        new MuscleWork(Muscle.Erector, 20),
    ])
]

export async function load() {
    for (const l of ExerciceSuggestionsBase) {
        const addedEs = await addToDatabase(StoreName.LIFT, l);
        console.log(addedEs);
    }
}