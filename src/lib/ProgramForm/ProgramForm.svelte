<script lang="ts">
	import { Lift } from "../../shared/class/Lift/Lift";
	import { Day } from "../../shared/class/Program/Day";
	import { Program, getRealProgram } from "../../shared/class/Program/Program";
	import { Superset } from "../../shared/class/Program/Superset";
	import { getObjectByIdInDatabase } from "../../shared/functions/Database";
	import { isPositive } from "../../shared/functions/Utils";
	import AutoCompleteInput from "../WorkoutForm/inputs/AutoCompleteInput.svelte";

	// Store variables
	/** All the exercices stored that can be shown as suggestions. */
	let ll: Lift[] = [];
	lifts.subscribe((exerciceSuggestions) => {
		ll = exerciceSuggestions;
	});

	export var p: Program = null;

	export var id: number = null;

	// If no program has been given and we receive an id from the url, we go fetch the program and instanciate it for the form
	if (!p && isPositive(id)) {
		getObjectByIdInDatabase<Program>("program-store", id).then(
			(pFetched) => {
				p = getRealProgram(pFetched);
			},
		);
	} else {
		p = new Program(null, "", null, null, null);
	}

	// !! MOCK
	p.days.push(new Day("", []));
	p.days = p.days;

	p.days[0].supersets.push(
		new Superset([
			new Exercice(new Lift(), null, "", new RepRange(6, 10)),
		]),
	);
	p.days = p.days;
	// !! MOCK
</script>

<div class="flex flex-col">
	<input
		type="text"
		class="input input-bordered"
		placeholder="Name of the program"
	/>

	{#each p.days as day}
		<div>
			<input
				type="text"
				class="input input-bordered input-lg"
				placeholder="Day's Name..."
				bind:value={day.name}
			/>
		</div>
		{#each day.supersets as s, i}
			<!-- <span>Set {i + 1}</span> -->
			{#each s.exercices as e}
				<AutoCompleteInput
					type="text"
					value={e.lift.id}
					placeholder="Lift"
					class="bg-base-500 input input-bordered input-lg text-primary z-10 w-40"
				/>

				<div class="flex flex-row w-full items-center">
					<input
						type="number"
						placeholder="Sets"
						class="input input-bordered w-20"
					/>
					<span>X</span>
					<div
						class="flex flex-row justify-between w-3/5 items-center"
					>
						<input
							type="number"
							placeholder="Min Reps"
							class="input input-bordered w-2/5"
						/>
						<span>-</span>
						<input
							type="number"
							placeholder="Max Reps"
							class="input input-bordered w-2/5"
						/>
					</div>
				</div>
			{/each}
		{/each}
		<button
			class="btn w-40"
			on:click={() => {
				day.supersets.push(
					new Superset([
						new Exercice(
							new Lift(),
							null,
							"",
							new RepRange(6, 10),
						),
					]),
				);
				p.days = p.days;
				console.log(p.days);
			}}>Add New Exercice</button
		>
	{/each}

	<button
		class="btn w-40"
		on:click={() => {
			p.days.push(new Day("", []));
			p.days = p.days;
			console.log(p.days);
		}}>Add New Day</button
	>
</div>
