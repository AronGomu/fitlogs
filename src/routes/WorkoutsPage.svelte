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

	document.querySelector("html").setAttribute("data-theme", "black");

	let workouts: Workout[] = [];

	let selectedWorkout: Workout = null;

	let deleteDialog: HTMLElement;
	let workoutToBeDeleted: Workout = null;

	let isWorkoutsLoaded: boolean = false;
	menuPath.set("Workouts");
	setWorkouts();

	async function setWorkouts() {
		workouts = await getWorkoutsFromDatabase();
		isWorkoutsLoaded = true;
	}

	function showNewWorkoutButton() {
		if (!workouts) return true;
		if (workouts.length === 0) return true;
		if (!workouts[0].createdAt.hasBeenCreatedToday()) return true;
		return false;
	}

	async function updateWorkout(w: Workout) {
		await updateInDatabase(StoreName.WORKOUT, w.id, w);
		setWorkouts();
	}

	/** Creates a new empty workout in the database and add it in the GUI. */
	async function onNewWorkout() {
		await addNewWorkout();
		setWorkouts();
	}

	/** Open or close the workout by clicking on it. */
	async function onOpenWorkout(id: number) {
		navigate(`/fitlogs/workout/${id}`);
	}

	/** Delete a workout in the database and remove it in the GUI. */
	async function deleteWorkout(w: Workout) {
		await deleteFromDatabase(StoreName.WORKOUT, w.id);
		setWorkouts();
	}

	/** Show the dialog for trying to delete a set. */
	function showDeleteDialog(workout: Workout, asModal = true) {
		workoutToBeDeleted = workout;
		try {
			deleteDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
		}
	}
</script>

{#if !isWorkoutsLoaded}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center loading loading-spinner loading-lg"></span>
	</div>
{/if}

{#if isWorkoutsLoaded}
	<div class="flex flex-row justify-center mb-4">
		{#if showNewWorkoutButton()}
			<button class="btn btn-primary" on:click={onNewWorkout}>
				New Workout
			</button>
		{:else}
			<!-- else content here -->
			<button class="btn btn-primary" disabled
				>New Workout</button
			>
		{/if}
	</div>

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
							on:click={onOpenWorkout(
								w.id,
							)}
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

<dialog id="modal" class="modal" bind:this={deleteDialog}>
	<form method="dialog" class="modal-box">
		<div class="flex flex-col justify-center items-center">
			<h3 class="font-bold text-lg mb-10">
				Delete Workout ?
			</h3>
			<button
				class="btn btn-error"
				on:click={() =>
					deleteWorkout(workoutToBeDeleted)}
				>CONFIRM
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
