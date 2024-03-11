<script lang="ts">
    import { getLiftsFromDatabase } from "../../shared/functions/database/lift";

	export let lifts = [];

	init();

	function init() {
		fetch
	    fetchLifts();
	}

	async function fetchLifts() {
		lifts = await getLiftsFromDatabase();
		console.log("lifts from liftTable", lifts)
	}
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Name</th>
				<th>Variation</th>
			</tr>
		</thead>

		<tbody>
			{#each lifts as l}
				<tr class="hover">
					<td>{l.name}</td>
					<td>{l.variation}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
