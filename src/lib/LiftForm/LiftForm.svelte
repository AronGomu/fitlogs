<script lang="ts">
	import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";
	import { Lift } from "../../shared/class/Lift/Lift";
	import { Muscle } from "../../shared/enum/Muscle";
	import { isPercentage, minLength } from "../../shared/functions/Form";
	import {
		enumToList,
		selectWholeTextOnFocus,
	} from "../../shared/functions/Utilitary";
	import { MuscleWork } from "../../shared/class/Lift/MuscleWork";
	import { dispatchPossiblyModalEvent } from "../../shared/functions/Modal";
	import { LiftFormEvents } from "../../shared/enum/Events";

	const dispatch = createEventDispatcher();

	export let isInModal: boolean = null;
	export let lift: Lift = new Lift();

	let exerciceIsValid: boolean = false;

	init();

	function init() {
		console.log(`liftform`);
		setExerciceIsValid();
		if (isInModal === null) console.error("You must give isInModal parameter !");
	}

	function setExerciceIsValid(): void {
		if (!lift) {
			console.error("Lift if null");
			exerciceIsValid = false;
		}

		else if (!minLength(lift.name, 3)) {
			console.error("Name is under 3 characters");
			exerciceIsValid = false;
		}

		else if (lift.variation && !minLength(lift.variation, 3)) {
			console.error("Variation is not null but is under 3 characters");
			exerciceIsValid = false;
		}

		else if (lift.targets && lift.targets.length > 0) {
			let totalPercentage: number = 0;

			setOnlyMuscleTo100();

			for (const t of lift.targets) {
				if (!t.work) t.work = 0;
				if (t.muscle && !t.work && !isPercentage(t.work)) {
					console.error("Muscle work is not valid");
					exerciceIsValid = false;
					return;
				}
				totalPercentage += t.work;
			}

			if (totalPercentage !== 100) {
				console.error("Total percentage is not equal to 100%");
				exerciceIsValid = false;
			}
		}

		else {
			console.log("Exercice is valid")
			exerciceIsValid = true;
		}
	}

	function setOnlyMuscleTo100() {
		let musclesDefined: MuscleWork[] = [];
		for (let i = 0; i < lift.targets.length; i++) {
			const t = lift.targets[i];
			if (t.muscle) {
				musclesDefined.push(t);
			}
		}

		if (musclesDefined.length === 1) {
			musclesDefined[0].work = 100;
			lift = lift;
		}
	}

	function addMuscle() {
		lift.targets.push(new MuscleWork(null, 0));
		lift = lift;
	}

	function addLift() {
		dispatchPossiblyModalEvent(dispatch, isInModal, LiftFormEvents.addLift, lift)
	}

	function deleteLift(l: Lift, i) {
		l.targets.splice(i, 1);
		l.targets = lift.targets;
		setExerciceIsValid();
	}
</script>

<div class="flex flex-col justify-center">
	<input
		type="text"
		class="m-2 input input-bordered input-primary"
		bind:value={lift.name}
		on:focus={(e) => selectWholeTextOnFocus(e)}
		on:input={() => setExerciceIsValid()}
		placeholder="Main name of the lift..."
	/>


	<input
		type="text"
		class="m-2 input input-bordered input-secondary"
		bind:value={lift.variation}
		on:focus={(e) => selectWholeTextOnFocus(e)}
		on:input={() => setExerciceIsValid()}
		placeholder="Name of the variation of lift..."
	/>


	{#each lift.targets as t, i}
		<div class="flex flex-row items-center justify-between">
			<select
				class="m-2 select select-bordered w-3/5 max-w-xs"
				bind:value={t.muscle}
				on:change={() => { setExerciceIsValid() }}
			>
				<option disabled selected>Select Muscle</option>
				{#each enumToList(Muscle) as muscle}
					<option value={muscle}>{muscle}</option>
				{/each}
			</select>

			<div class="m-2 relative w-24">
				<input
					type="number"
					class="input input-bordered w-full"
					bind:value={t.work}
					on:focus={(e) =>
						selectWholeTextOnFocus(
							e,
						)}
					on:input={() => setExerciceIsValid()}
				/>
				<div
					class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center"
				>
					%
				</div>
			</div>

			<button on:click={() => {deleteLift(lift, i)}} >
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

	<button class="btn btn-neutral" 
		on:click={() => addMuscle()}
	>Add Working Muscle</button>

	{#if exerciceIsValid}
		<button class="btn btn-success" on:click={() => addLift()}>Add Lift</button>
	{:else}
		<button class="btn btn-success" disabled>Add Lift</button>
	{/if}
</div>
