<script lang="ts">
	import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
	import Icon from "@iconify/svelte";
	import WorkoutForm from "../lib/WorkoutForm/WorkoutForm.svelte";
	import {
		StoreName,
		addNewWorkout,
		deleteFromDatabase,
		fetchWorkoutList,
		updateInDatabase,
	} from "../shared/functions/Database";
	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
	import { Workout } from "../shared/class/Workout/Workout";

	let workouts: Workout[] = [];

	let selectedWorkout: Workout = null;

	setWorkouts();

	async function setWorkouts() {
		workouts = await fetchWorkoutList();
	}

	async function updateWorkout(w: Workout) {
		console.log(w);
		await updateInDatabase(StoreName.WORKOUT, w.id, w);
		setWorkouts();
	}

	/** Creates a new empty workout in the database and add it in the GUI. */
	async function onNewWorkout() {
		await addNewWorkout();
		setWorkouts();
	}

	/** Open or close the workout by clicking on it. */
	async function onOpenWorkout(w: Workout) {
		selectedWorkout = w;
		w.isSelfOpen = !w.isSelfOpen;
		updateWorkout(w);
	}

	/** Delete a workout in the database and remove it in the GUI. */
	async function onDeleteWorkout(w: Workout) {
		await deleteFromDatabase(StoreName.WORKOUT, w.id);
		setWorkouts();
	}
</script>

<div class="flex flex-row justify-center mb-4">
	<button class="btn btn-primary" on:click={onNewWorkout}>New Workout</button>
</div>

{#if workouts}
	<div class="collapse bg-base-200">
		{#each workouts as w}
			<div
				class="exercice-container collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full"
			>
				<input
					type="checkbox"
					name="exercice"
					checked={w.isSelfOpen}
					class="cursor-pointer"
					on:click={() => onOpenWorkout(w)}
				/>
				<div
					class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title"
				>
					<div class="flex flex-row justify-between w-full">
						{formatDateWithSpelledOutMonth(w.createdAt.getDate())}
						{w.isSelfOpen}
					</div>
					creation
				</div>

				{#if w.isSelfOpen}
					<div class="collapse-content">
						<WorkoutForm
							workout={w}
							on:update={() => updateWorkout(w)}
						/>
						<div class="w-full flex justify-end">
							<button
								class="btn btn-xs"
								on:click={() => onDeleteWorkout(w)}
								><Icon
									icon={trashCanOutline}
									color="red"
									width="10"
									height="10"
								/></button
							>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.override-collapse {
		overflow: initial;
	}
</style>
