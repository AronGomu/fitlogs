<script lang="ts">
    import { getLiftsFromDatabase } from "../../shared/functions/database/lift";

	export let lifts = [];

	init();

	function init() {
	    fetchLifts();
	}

	async function fetchLifts() {
		lifts = await getLiftsFromDatabase();
		console.log("lifts from liftTable", lifts)
	}
</script>

<div class="overflow-x-auto">
	<table class="table">
		<tbody>
			{#each lifts as l}
				<tr class="hover">
					<td>{l.getExerciceName()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
