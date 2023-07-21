import { Lift } from "../class/Lift";
import { MuscleWork } from "../class/MuscleWork";
import { Muscle } from "../enum/Muscle";
import { StoreName, addToDatabase } from "../functions/Database";

/** List of Lifts loaded by default on the app at the startup. */
const ExerciceSuggestionsBase: Lift[] = [
	new Lift(null, "Squat", "Low bar", [
		new MuscleWork(Muscle.Quad, 50),
		new MuscleWork(Muscle.Glute, 30),
		new MuscleWork(Muscle.Hamstring, 10),
		new MuscleWork(Muscle.Erector, 10),
	]),
	new Lift(null, "Squat", "High bar", [
		new MuscleWork(Muscle.Quad, 60),
		new MuscleWork(Muscle.Glute, 20),
		new MuscleWork(Muscle.Hamstring, 10),
		new MuscleWork(Muscle.Erector, 10),
	]),
	new Lift(null, "Bench Press", "", [
		new MuscleWork(Muscle.Chest, 60),
		new MuscleWork(Muscle.DeltFront, 20),
		new MuscleWork(Muscle.Triceps, 20),
	]),
	new Lift(null, "Bench Press", "Close Grip", [
		new MuscleWork(Muscle.Triceps, 50),
		new MuscleWork(Muscle.Chest, 30),
		new MuscleWork(Muscle.DeltFront, 20),
	]),
	new Lift(null, "Deadlift", "", [
		new MuscleWork(Muscle.Erector, 50),
		new MuscleWork(Muscle.Glute, 30),
		new MuscleWork(Muscle.Hamstring, 20),
	]),
	new Lift(null, "Deadlift", "Romanian", [
		new MuscleWork(Muscle.Hamstring, 50),
		new MuscleWork(Muscle.Glute, 30),
		new MuscleWork(Muscle.Erector, 20),
	]),
	new Lift(null, "Good Morning", "", [
		new MuscleWork(Muscle.Hamstring, 50),
		new MuscleWork(Muscle.Glute, 30),
		new MuscleWork(Muscle.Erector, 20),
	]),
	new Lift(null, "Triceps Extension", "Cable Downward", [
		new MuscleWork(Muscle.Triceps, 100),
	]),
	new Lift(null, "Triceps Extension", "French Press", [
		new MuscleWork(Muscle.Triceps, 100),
	]),
	new Lift(null, "Dip", "", [
		new MuscleWork(Muscle.Chest, 50),
		new MuscleWork(Muscle.Triceps, 30),
		new MuscleWork(Muscle.DeltFront, 20),
	]),
	new Lift(null, "Overhead Press", "Barbell Standing", [
		new MuscleWork(Muscle.DeltFront, 60),
		new MuscleWork(Muscle.DeltLateral, 25),
		new MuscleWork(Muscle.Triceps, 15),
	]),
	new Lift(null, "Curl", "EZ Bar Standing", [
		new MuscleWork(Muscle.Biceps, 100),
	]),
	new Lift(null, "Row", "1 Arm", [
		new MuscleWork(Muscle.Lat, 40),
		new MuscleWork(Muscle.TrapLow, 20),
	]),
	new Lift(null, "Russian Twist", "", [
		new MuscleWork(Muscle.Lat, 40),
		new MuscleWork(Muscle.TrapLow, 20),
	]),
	new Lift(null, "Shrugs", "", [
		new MuscleWork(Muscle.Lat, 40),
		new MuscleWork(Muscle.TrapLow, 20),
	]),
	new Lift(null, "Calf Raise", "Sitted", [new MuscleWork(Muscle.Calve, 100)]),
	new Lift(null, "Pull-up", "", [new MuscleWork(Muscle.Calve, 100)]),
	new Lift(null, "Pull-up", "Wide", [new MuscleWork(Muscle.Calve, 100)]),
	new Lift(null, "Chin-up", "", [new MuscleWork(Muscle.Calve, 100)]),
];

export async function load() {
	for (const l of ExerciceSuggestionsBase) {
		const addedEs = await addToDatabase(StoreName.LIFT, l);
		console.log(addedEs);
	}
}
