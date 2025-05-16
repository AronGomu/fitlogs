<script lang="ts">
	import plusIcon from "@iconify/icons-mdi/plus";
	import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import type { Setting } from "../../shared/class/Settings";
	import { settings } from "../../shared/store/settingsStore";
	import InputNumber from "./inputs/InputNumber.svelte";
	import type { Serie } from "../../shared/class/Workout/Serie";
	import type { Exercice } from "../../shared/class/Workout/Exercice";
	import { getRealLift, Lift } from "../../shared/class/Lift/Lift";
	import AutoCompleteInput from "./inputs/AutoCompleteInput.svelte";

	const dispatch = createEventDispatcher();

	export let index: number = null;
	export let e: Exercice;

	/** Settings Imported form the store. */
	let si: Setting;
	settings.subscribe((s) => (si = s));

	// defining values
	let isMounted: boolean = false;
	let setToBeDeleted: Serie = null;

	onMount(() => {
		isMounted = true;
	});

	/** Add a new empty set to an exercice object and signal to the parent to update the database. */
	function addSet() {
		e.addSet(si.wm);
		dispatch("update", e);
	}

	/** Delete a set and signal to the parent to update the database.*/
	function deleteSet(s: Serie) {
		if (!s) throw new Error("There is no set to be deleted !");

		for (let i = 0; i < e.series.length; i++) {
			if (e.series[i] === s) {
				e.series.splice(i, 1);
				dispatch("update", e);
				return;
			}
		}
	}

	/** Show the dialog for trying to delete a set. */
	let deleteDialog: HTMLElement;
	function showDeleteDialog(set: Serie, asModal = true) {
		setToBeDeleted = set;
		try {
			deleteDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
		}
	}

	var liftToAdd: Lift = null;
	function addLift(lift: Lift) {
		liftToAdd = getRealLift(lift);

		liftToAdd.setDefaultTargetsForForm();
		console.log(liftToAdd);
		showAddLiftDialog();
	}

	let addLiftDialog: HTMLElement;
	function showAddLiftDialog(asModal = true) {
		try {
			addLiftDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
		}
	}

	function updateExerciceName(event: any, exercice: Exercice) {
		exercice.lift.name = event.detail;
		dispatch("update", e);
	}
</script>

{#if isMounted && e}
	<div
		class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title"
	>
		<div
			class="flex flex-row w-full overflow-visible override-input-exerciceName items-center"
		>
			{#if index !== null}
				<span class="text-2xl">{index + 1}.</span>
			{/if}
			<AutoCompleteInput
				type="text"
				value={e.lift.name}
				placeholder="Exercice Name"
				class="bg-base-500 input input-ghost input-lg text-primary z-10"
				on:update={(event) =>
					updateExerciceName(event, e)}
			/>
			{#if e.isNewLift}
				<div class="flex justify-center w-full mt-2">
					<button
						class="btn btn-secondary w-32"
						on:click={() => {
							console.log(e);
							addLift(e.lift);
						}}
					>
						Add to Lifts
					</button>
				</div>
			{/if}
		</div>
	</div>

	{#each e.series as set}
		<div
			class="w-full flex justify-between items-center bg-base-300 p-2 rounded-xl"
		>
			<div class="flex justify-between items-center">
				<div class="flex flex-row items-center">
					<InputNumber
						placeholder="Weight"
						className="input w-24 mr-0 text-left"
						initValue={set.weight.weight}
						metric={set.weight.metric}
						on:keyPress={() =>
							dispatch("update", e)}
						on:input={(event) => {
							set.weight.weight =
								event.detail.value;
							dispatch("update", e);
						}}
					/>

					<span class="font-bold mx-2">X</span>

					<InputNumber
						placeholder="Reps"
						className="input w-14 ml-0 text-center"
						initValue={set.reps}
						on:keyPress={() =>
							dispatch("update", e)}
						on:input={(event) => {
							set.reps = Number(
								event.detail[
									"value"
								],
							);
							dispatch("update", e);
						}}
					/>

					<span class="mx-2">rep</span>
				</div>
			</div>

			<button
				class="btn btn-ghost btn-xs"
				on:click={() => {
					showDeleteDialog(set, true);
				}}
			>
				<Icon
					icon={trashCanOutline}
					color="red"
					width="15"
					height="15"
					class="cursor-pointer"
				/>
			</button>
		</div>
	{/each}

	<div class="flex justify-center w-full mt-2">
		<button class="btn btn-primary w-32" on:click={addSet}>
			<Icon
				icon={plusIcon}
				color="white"
				width="20"
				height="20"
			/>
			Add Set
		</button>
	</div>
{/if}

<dialog id="modal" class="modal" bind:this={deleteDialog}>
	<form method="dialog" class="modal-box">
		<div class="flex flex-col justify-center items-center">
			<h3 class="font-bold text-lg mb-10">Delete Set ?</h3>
			<button
				class="btn btn-error"
				on:click={() => deleteSet(setToBeDeleted)}
				>CONFIRM</button
			>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="modal" class="modal" bind:this={addLiftDialog}>
	<form method="dialog" class="modal-box">
		<LiftForm lift={liftToAdd} />
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	.override-collapse-title {
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		min-height: 1rem;
	}

	.override-collapse-content {
		padding: 0.5;
	}
</style>
