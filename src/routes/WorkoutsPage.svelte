<script lang="ts">
	import {
		StoreName,
		deleteFromDatabase,
		updateInDatabase,
	} from "../shared/functions/Database";

	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
	import { Workout } from "../shared/class/Workout/Workout";
	import { menuPath } from "../shared/store/menuPath";
	import { navigate } from "svelte-routing";
	import { getWorkoutsFromDatabase } from "../shared/functions/database/workout";
	import Modal from "../lib/Generic/Modal.svelte";
	import NewWorkoutDateForm from "../lib/WorkoutForm/NewWorkoutDateForm.svelte";
	import { NewWorkoutDateFormEvents } from "../shared/enum/Events";
    import type { WorkoutDate } from "../shared/class/Workout/WorkoutDate";

	document.querySelector("html").setAttribute("data-theme", "black");

	let workouts: Workout[] = [];

	let selectedWorkout: Workout = null;

	let deleteDialog: HTMLElement;
	let workoutToBeDeleted: Workout = null;

	let showNewWorkoutDateForm: boolean = false;

	let isWorkoutsLoaded: boolean = false;

	init()

	async function init(): Promise<void> {
		menuPath.set("Workouts");
		await setWorkouts()
	}


	async function setWorkouts(): Promise<void> {
		workouts = await getWorkoutsFromDatabase();
		console.log("workouts : ", workouts)
		isWorkoutsLoaded = true;
	}

	
	// async function updateWorkout(w: Workout) {
	// 	await updateInDatabase(StoreName.WORKOUT, w.id, w);
	// 	setWorkouts();
	// }
	//

	/** Creates a new empty workout in the database and add it in the GUI. */
	async function onNewWorkout() {
		showNewWorkoutDateForm = true;
	}

	async function openWorkout(wd: WorkoutDate) {
		console.log(`OPEN WORKOUT`, wd)
		navigate(
			`/fitlogs/workout/${wd.year}-${wd.month}-${wd.day}`,
		);
	}

	// /** Delete a workout in the database and remove it in the GUI. */
	// async function deleteWorkout(w: Workout) {
	// 	await deleteFromDatabase(StoreName.WORKOUT, w.id);
	// 	setWorkouts();
	// }
	//
	// /** Show the dialog for trying to delete a set. */
	// function showDeleteDialog(workout: Workout, asModal = true) {
	// 	workoutToBeDeleted = workout;
	// 	try {
	// 		deleteDialog[asModal ? "showModal" : "show"]();
	// 	} catch (e) {
	// 		throw new Error(e);
	// 	}
	// }
</script>

<div class="flex flex-row justify-center mb-4">
	<button class="btn btn-primary" on:click={onNewWorkout}>
		New Workout
	</button>
</div>


{#if !isWorkoutsLoaded}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center loading loading-spinner loading-lg"></span>
	</div>
{/if}

{#if isWorkoutsLoaded}
	
	<div class="overflow-x-auto">
		<table class="table">
			<!-- <thead> -->
			<!-- 	<tr> -->
			<!-- 		<th>Date</th> -->
			<!-- 	</tr> -->
			<!-- </thead> -->

			<tbody>
				{#each workouts as w}
					<tr>
						<th
							class="cursor-pointer"
							on:click={() => {openWorkout(w.createdAt)}}
						>
							<span
								>{formatDateWithSpelledOutMonth(
									w.createdAt.getDate(),
								)}</span
							>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<!-- TODO Comprendre comment remonter la date -->
<Modal 
	component={NewWorkoutDateForm} 
	events={NewWorkoutDateFormEvents} 
	bind:show={showNewWorkoutDateForm}
	on:submitTodayDate={wd => openWorkout(wd)}
>
</Modal>

