<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Lift } from "../../shared/class/Lift/Lift";
	const dispatch = createEventDispatcher();


	export let lifts: Lift[];
	function clickExercice(lift: Lift): void {
		dispatch("clickExercice", lift)
	}
</script>

<div class="overflow-x-auto">
	<table class="table">
		<tbody>
			{#each lifts as l}
				<tr class="hover">
					<td>
					{#if l}
						<button on:click={() => clickExercice(l)}>
							{l.getFullName()}
						</button>
					{:else}
						{"empty"}
					{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
