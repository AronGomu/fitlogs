<script lang="ts">
	import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
	import Icon from "@iconify/svelte";
	import magnifyIcon from "@iconify/icons-mdi/magnify";
	import LiftForm from "../lib/LiftForm/LiftForm.svelte";
	import { Lift } from "../shared/class/Lift";
	import { MuscleWork } from "../shared/class/MuscleWork";
	import { lifts } from "../shared/store/liftStore";
	import {
		StoreName,
		deleteFromDatabase,
	} from "../shared/functions/Database";
	import sortAlphabeticalAscending from "@iconify/icons-mdi/sort-alphabetical-ascending";
	import sortAlphabeticalDescending from "@iconify/icons-mdi/sort-alphabetical-descending";
	import {
		enumToList,
		isStringNotEmpty,
		selectWholeTextOnFocus,
	} from "../shared/functions/Utilitary";
	import { Muscle } from "../shared/enum/Muscle";
	import { onMount } from "svelte";
	import { FiltersLift } from "../shared/class/FiltersLift";

	// TODO : Implements deletion, addition, edition and detail page for exercices. Probably creating another page that is a form or putting at the bottom of the page, idk, we'll see
	// TODO2 : Replace the exercice name from Exercice clas with a Lift object

	/** All the filters for the lift list. */
	const filtersLift: FiltersLift = new FiltersLift();

	/** All the exercices stored that can be shown as suggestions. */
	var ll: Lift[] = [];
	lifts.subscribe((lifts) => {
		ll = lifts;
		applyFilters();
	});

	var llFiltered: Lift[] = [];

	/** New Lift object that will be modified then added to the database. */
	var nl: Lift = new Lift();
	nl.targets.push(new MuscleWork(null, 0));

	/** HTML element containing the filter form for the lifts opening on modal/dialog. */
	var filterDialog: HTMLElement;
	/** Show the dialog for trying to delete a set. */
	function showFilterDialog(asModal = true) {
		try {
			filterDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
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
</script>

<div class="h-full flex flex-col overflow-hidden">
	<div>
		{#if nl}
			<LiftForm
				lift={nl}
				on:liftAdded={(event) => {
					lifts.update((toUpdate) => {
						toUpdate.push(event.detail);
						return toUpdate;
					});
					nl = null;
				}}
				on:liftUpdated={(event) => {
					lifts.update((toUpdate) => {
						for (let l of toUpdate) {
							if (l.id === event.detail.id) {
								l = event.detail;
							}
						}
						return toUpdate;
					});
					nl = null;
				}}
			/>
		{:else}
			<div class="m-4 flex justify-center">
				<button
					class="btn btn-primary"
					on:click={() => {
						nl = new Lift();
						nl.targets = [new MuscleWork(null, 0)];
					}}
				>
					New Exercice
				</button>
			</div>
		{/if}
	</div>

	<div class="flex-1 overflow-y-auto">
		<table class="table">
			<!-- head -->
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
					<!-- <th>Muscles Targeted</th> -->
					<th>
						<button
							on:click={() => {
								showFilterDialog(true);
							}}
						>
							<Icon
								icon={magnifyIcon}
								color="white"
								width="15"
								height="15"
								class="cursor-pointer"
							/>
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each llFiltered as l, i}
					<tr>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<td
							class="font-bold"
							on:click={() => {
								nl = l;
							}}>{l.name}</td
						>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<td>{l.variation}</td>
						<!-- <td>
                    {#each l.targets as mw, i}
                    
                    {#if l.targets[i] !== last(l.targets)}
                    <span>{`${mw.work}% `}</span>
                    <span class="font-bold">{`${mw.muscle}, `}</span>
                    {:else}
                    <span>{`${mw.work}% `}</span>
                    <span class="font-bold">{`${mw.muscle}`}</span>
                    {/if}
                    {/each}
                </td> -->
						<td>
							<!-- svelte-ignore missing-declaration -->
							<button
								on:click={() => {
									deleteFromDatabase(
										StoreName.LIFT,
										l.id
									).then(() => {
										ll.splice(i, 1);
										ll = ll;
									});
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
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<dialog id="modal" class="modal" bind:this={filterDialog}>
	<form method="dialog" class="modal-box">
		<div class="flex flex-col justify-center items-center">
			<div class="form-control w-full max-w-xs">
				<!-- svelte-ignore a11y-label-has-associated-control -->
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

				<!-- svelte-ignore a11y-label-has-associated-control -->
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
