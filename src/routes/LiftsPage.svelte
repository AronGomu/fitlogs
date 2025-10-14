<script lang="ts">
	import { Lift } from '../shared/class/Lift/Lift';
	import {
		isStringNotEmpty,
	} from '../shared/functions/Utils';
	import { FiltersLift } from '../shared/class/Lift/FiltersLift';
    import { getLiftsFromDatabase } from '../shared/database/lift';

	/** All the filters for the lift list. */
	const filtersLift: FiltersLift = new FiltersLift();

	let ll: Lift[] = [];
	let llFiltered: Lift[] = [];

	init()

	async function init() {
		await setLl();
		applyFilters();
	}

	async function setLl() {
		const fetchLifts = await getLiftsFromDatabase();
		if (!fetchLifts) {
			console.error("fetchLifts if null ?");
		} else if (fetchLifts.length === 0) {
			console.error("fetchLifts has no lift ?");
		} else {
			ll = fetchLifts;
		}
	}


	/** Apply the filters from filtersLift to llFiltered */
	function applyFilters() {
		llFiltered = ll;
		// TODO apply the filter taking the ll to llFiltered
		if (isStringNotEmpty(filtersLift.name)) {
			llFiltered = ll.filter((lift) =>
				lift.name.includes(filtersLift.name)
			);
		}

		if (isStringNotEmpty(filtersLift.variation)) {
			llFiltered = ll.filter((lift) =>
				lift.variation.includes(filtersLift.variation)
			);
		}

		for (const cf of filtersLift.muscles) {
			if (cf.isChecked) {
				llFiltered = llFiltered.filter((lift) =>
					lift.targets.find((t) => t.muscle == cf.name)
				);
			}
		}
	}

	function showLift(lift: Lift) {
		console.log(`showLift`, lift);
	}
</script>

<div class="flex flex-col justify-center h-full w-full">
	<button class="btn btn-primary" on:click={() => showLift(null)}>New Lift</button>

	<div class="flex-1 overflow-y-auto">
		<table class="table">
			<thead>
				<tr>
					<th>
						<div>
							<span class="font-bold">Name</span>
						</div>
					</th>
					<th>
						<div>
							<span class="font-bold">Variation</span>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each llFiltered as l, i}
					<tr class="hover cursor-pointer border-2 border-neutral-700"
						on:click={() => { showLift(l) }}>
						<td class="font-bold w-40">{l.name}</td>
						<td>{l.variation}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!--
<dialog id="modal" class="modal" bind:this={filterDialog}>
	<form method="dialog" class="modal-box">
		<div class="flex flex-col justify-center items-center">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text-alt">Name</span>
				</label>
				<input
					type="text"
					placeholder="Filter by name"
					class="input input-bordered"
					bind:value={filtersLift.name}
					on:focus={(e) => selectWholeTextOnFocus(e)}
				/>

				<label class="label">
					<span class="label-text-alt">Variation</span>
				</label>
				<input
					type="text"
					placeholder="Filter by variation"
					class="input input-bordered"
					bind:value={filtersLift.variation}
					on:focus={(e) => selectWholeTextOnFocus(e)}
				/>

				<span class="mt-2 font-bold">Muscles</span>
				<div class="grid grid-cols-2 gap-4">
					{#each filtersLift.muscles as muscle}
						<label class="label cursor-pointer">
							<span class="label-text">{muscle.name}</span>
							<input
								type="checkbox"
								class="checkbox checkbox-sm"
								bind:checked={muscle.isChecked}
							/>
						</label>
					{/each}
				</div>

				<button class="mt-2 btn btn-primary" on:click={applyFilters}
					>Submit</button
				>
			</div>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
-->
