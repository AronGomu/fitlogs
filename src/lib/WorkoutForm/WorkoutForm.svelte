<script lang="ts">
	import chevronDown from "@iconify/icons-mdi/chevron-down";
	import minusIcon from "@iconify/icons-mdi/minus";
	import plusIcon from "@iconify/icons-mdi/plus";

	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { Exercice } from "../../shared/class/Exercice";
	import { Settings } from "../../shared/class/Settings";
	import { Workout, getRealWorkout } from "../../shared/class/Workout";
	import { WorkoutGUI } from "../../shared/class/WorkoutGUI";
	import { getReducedStringMetric } from "../../shared/enum/WeightMetrics";
	import {
		StoreName,
		fetchSettings,
		updateInDatabase,
	} from "../../shared/functions/Database";
	import ExerciceForm from "./ExerciceForm.svelte";
	import AutoCompleteInput from "./inputs/AutoCompleteInput.svelte";
	import { ExerciceGUI } from "../../shared/class/ExerciceGUI";

	let settings: Settings = new Settings();
	fetchSettings().then((fs) => (settings = fs));

	/** Workout object */
	export let workoutGUI: WorkoutGUI;

	onMount(() => {});

	/** Update the workout in the database. */
	function updateWorkout() {
		updateInDatabase<Workout>(
			StoreName.WORKOUT,
			workoutGUI.id,
			workoutGUI.convertToWorkout()
		).then((updatedW) => {
			//TODO: Stop closing the extra from exercice on refresh
			workoutGUI.updateWorkout(getRealWorkout(updatedW));
			console.log(workoutGUI.el);
			console.log(workoutGUI.elGUI);
			workoutGUI.elGUI = workoutGUI.elGUI; // refresh
		});
	}

	/** Add a new exercice to the workout and update it in the database. */
	function newExercice() {
		workoutGUI.addNewExercice();
		updateWorkout();
	}

	// /** Duplicate the exercice in the workout. */
	// function duplicateExercice(e: Exercice) {
	//   workout.el.push(lodash.cloneDeep(e));
	//   updateAndRefresh();
	// }

	/** Add an exercice from the workout and update it in the database. */
	function deleteExercice(e: Exercice) {
		for (let i = 0; i < workoutGUI.el.length; i++) {
			if (e === workoutGUI.el[i]) workoutGUI.el.splice(i, 1);
		}
	}

	/** Close all of the other workouts open. */
	function onOpenExercice(eToOpen: ExerciceGUI) {
		eToOpen.isSelfOpen = !eToOpen.isSelfOpen;
		workoutGUI = workoutGUI;
	}

	function updateName(e: ExerciceGUI, newName: string) {
		e.lift = newName;
		workoutGUI.el = [];
		for (const elGUI of workoutGUI.elGUI) {
			workoutGUI.el.push(elGUI.convertToExercice());
		}
		updateWorkout();
	}
</script>

<!-- TODO : Make the exercice suggestions work from selecting and adding new ones -->

<div id="workout" class="flex flex-col items-center">
	{#each workoutGUI.elGUI as e}
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
						value={e.lift}
						placeholder="Exercice Name"
						class="bg-base-500 input input-ghost input-lg text-primary z-10"
						on:input={(event) => {
							updateName(e, event.detail);
						}}
						on:selectSuggestion={(event) => {
							updateName(e, event.detail);
						}}
					/>
				</div>
				<span class="text-secondary text-sm"
					>{`${e.slGUI.length} Sets`}</span
				>
				{#if e.getMaxWeight(settings.wm)}
					<span class="text-secondary text-sm"
						>{` - Max : ${e.getMaxWeight(
							settings.wm
						)}${getReducedStringMetric(settings.wm)}`}
						{e.isSelfOpen}
						{e.isExtraOpen}</span
					>
				{/if}
			</div>

			<!-- CONTENT -->
			{#if e.isSelfOpen}
				<!-- content here -->
				<div class="collapse-content">
					<ExerciceForm
						{e}
						on:update={(event) => {
							workoutGUI.el = [];
							for (const eGUI of workoutGUI.elGUI)
								workoutGUI.el.push(eGUI.convertToExercice());
							updateWorkout();
						}}
					/>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="w-full flex justify-end cursor-pointer"
						on:click={() => (e.isExtraOpen = !e.isExtraOpen)}
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
