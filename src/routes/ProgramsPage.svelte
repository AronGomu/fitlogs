<script lang="ts">
	import { FiltersProgram } from "./../shared/class/Program/FiltersProgram.ts";
	import { programs } from "../shared/store/programStore.ts";
	import { isStringNotEmpty } from "../shared/functions/utils.js";
	import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
	import Icon from "@iconify/svelte";
	import magnifyIcon from "@iconify/icons-mdi/magnify";
	import { selectWholeText } from "../shared/functions/utils.js";
	import type { Program } from "../shared/class/Program/Program.ts";
	import { menuPath } from "../shared/store/menuPath.ts";

	menuPath.set("Programs");

	/** All the filters for the program list. */
	const filters: FiltersProgram = new FiltersProgram();
	/** All the programs fetched unfiltered */
	var pl: Program[] = [];
	programs.subscribe((programs) => {
		pl = programs;
		applyFilters();
	});

	/** List of the programs showed (matching the filters) */
	var plFiltered: Program[] = [];

	/** HTML element containing the filter form for the programs opening on modal/dialog. */
	var filterDialog: HTMLElement;
	/** Show the dialog for trying to delete a set. */
	function showFilterDialog(asModal = true) {
		try {
			filterDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
		}
	}

	/** Apply the filters from filters to plFiltered */
	function applyFilters() {
		plFiltered = pl;
		// TODO apply the filter taking the pl to llFiltered

		// Filtering by names
		if (isStringNotEmpty(filters.name)) {
			plFiltered = pl.filter((program) =>
				program.name.includes(filters.name),
			);
		}
	}

	function gotoNewProgram() {
		// todo navigate to empty ProgramForm page
	}
</script>

<div class="h-full flex flex-col overflow-hidden">
	<div class="flex-1 overflow-y-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>
						<div>
							<span class="font-bold"
								>Name</span
							>
						</div>
					</th>
					<th>
						<div>
							<span class="font-bold"
								>Category</span
							>
						</div>
					</th>
					<th>
						<button
							on:click={() => {
								showFilterDialog(
									true,
								);
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
				{#each plFiltered as p}
					<tr>
						<td class="font-bold"> </td>
						<td>{p.type}</td>
						<td>{p.description}</td>
						<td>
							<button>
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
				<div class="label">
					<span class="label-text-alt">Name</span>
				</div>
				<input
					type="text"
					placeholder="Filter by name"
					class="input input-bordered"
					bind:value={filters.name}
					on:focus={(e) =>
						selectWholeText(e)}
				/>

				<div class="label">
					<span class="label-text-alt"
						>Description</span
					>
				</div>
				<input
					type="text"
					placeholder="Filter by description"
					class="input input-bordered"
					on:focus={(e) =>
						selectWholeText(e)}
				/>

				<span class="mt-2 font-bold">Types</span>
				<div class="grid grid-cols-2 gap-4">
					{#each filters.types as type}
						<label
							class="label cursor-pointer"
						>
							<span class="label-text"
								>{type.name}</span
							>
							<input
								type="checkbox"
								class="checkbox checkbox-sm"
								bind:checked={type.isChecked}
							/>
						</label>
					{/each}
				</div>

				<button
					class="mt-2 btn btn-primary"
					on:click={applyFilters}>Submit</button
				>
			</div>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>

	<button class="mt-2 btn btn-primary" on:click={gotoNewProgram}
		>New Program</button
	>
</dialog>
