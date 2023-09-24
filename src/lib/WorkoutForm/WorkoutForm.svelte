<script lang="ts">
	import minusIcon from "@iconify/icons-mdi/minus";
	import plusIcon from "@iconify/icons-mdi/plus";
	import Icon from "@iconify/svelte";
	import { Settings } from "../../shared/class/Settings";
	import { Exercice } from "../../shared/class/Workout/Exercice";
	import {
		Workout,
		getRealWorkout,
	} from "../../shared/class/Workout/Workout";
	import { getReducedStringMetric } from "../../shared/enum/WeightMetrics";
	import {
		StoreName,
		fetchSettings,
		updateInDatabase,
	} from "../../shared/functions/Database";
	import ExerciceForm from "./ExerciceForm.svelte";
	import AutoCompleteInput from "./inputs/AutoCompleteInput.svelte";
	import type { Weight } from "../../shared/class/Workout/Weight";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	let settings: Settings = new Settings();
	fetchSettings().then((fs) => (settings = fs));

	/** Workout object */
	export let workout: Workout;

	function updateWorkout() {
		dispatch("update", workout);
	}

	/** Add a new exercice to the workout and update it in the database. */
	function newExercice() {
		workout.addNewExercice();
		updateWorkout();
	}

	/** Add an exercice from the workout and update it in the database. */
	function deleteExercice(e: Exercice) {
		for (let i = 0; i < workout.el.length; i++) {
			if (e === workout.el[i]) workout.el.splice(i, 1);
		}
		updateWorkout();
	}

	/** Close all of the other workouts open. */
	function onOpenExercice(eToOpen: Exercice) {
		eToOpen.isSelfOpen = !eToOpen.isSelfOpen;
		updateWorkout();
	}

	function updateExerciceName(event, exercice: Exercice) {
		console.log(`updateExerciceName`);
		console.log(event);
		console.log(exercice);
		exercice.lift.name = event.detail;
		updateWorkout();
	}

	function openExerciceExtra(e: Exercice) {
		console.log(e.isExtraOpen);
		e.isExtraOpen = !e.isExtraOpen;
		console.log(e.isExtraOpen);
		updateWorkout();
	}

	function updateName(e: Exercice, newName: string) {}
</script>

<!-- TODO : Make the exercice suggestions work from selecting and adding new ones -->

<div id="workout" class="flex flex-col items-center">
	{#each workout.el as e}
		<div
			class="exercice-container collapse collapse-arrow bg-base-100 my-2 w-5/6 override-collapse w-full force-overflow-visible"
		>
			<input
				type="checkbox"
				name="exercice"
				checked={e.isSelfOpen}
				class="cursor-pointer"
				on:click={() => {
					onOpenExercice(e);
				}}
			/>

			<!-- TITLE -->
			<div
				class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title"
			>
				<div
					class="flex flex-row justify-between w-full overflow-visible override-input-exerciceName"
				>
					<AutoCompleteInput
						type="text"
						value={e.lift.name}
						placeholder="Exercice Name"
						class="bg-base-500 input input-ghost input-lg text-primary z-10"
						on:update={(event) => updateExerciceName(event, e)}
					/>
				</div>
				{#if !e.isSelfOpen}
					<span class="text-secondary text-sm"
						>{`${e.series.length} Sets`}
					</span>
					{#if e.getMaxWeight(settings.wm)}
						<span class="text-secondary text-sm"
							>{` - Max : ${e.getMaxWeight(
								settings.wm
							)}${getReducedStringMetric(settings.wm)}`}
							{e.isSelfOpen}
							{e.isExtraOpen}
						</span>
					{/if}
				{/if}
			</div>

			<!-- CONTENT -->
			{#if e.isSelfOpen}
				<!-- content here -->
				<div class="collapse-content">
					<ExerciceForm
						{e}
						on:update={(event) => {
							/* console.log(event.detail); */
							/* workoutGUI.el = event.detail; */
							updateWorkout();
						}}
					/>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="w-full flex justify-end cursor-pointer"
						on:click={() => openExerciceExtra(e)}
					>
						{#if e.isExtraOpen}
							<Icon
								icon={minusIcon}
								color="blue"
								width="15"
								height="15"
							/>
						{:else}
							<Icon
								icon={plusIcon}
								color="blue"
								width="15"
								height="15"
							/>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}

	<button class="btn btn-primary w-30" on:click={newExercice}
		>New Exercice</button
	>
</div>

<style>
	.force-overflow-visible {
		overflow: visible !important;
	}

	.override-input-exerciceName {
		padding: 0.5rem 0 0 0 !important;
		font-size: 1.125rem !important;
	}

	.override-input-advancedOptions {
		padding: 0 0 0 0;
		min-height: 2rem;
	}

	.override-collapse {
		width: 90%;
	}

	.override-collapse-title {
		padding: 1rem;
	}
</style>
