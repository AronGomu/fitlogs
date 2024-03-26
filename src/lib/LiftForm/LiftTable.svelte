<script lang="ts">
    import type { Lift } from "../../shared/class/Lift/Lift";

	export let lifts: Lift[];
</script>

<div class="overflow-x-auto">
	<table class="table">
		<tbody>
			{#each lifts as l}
				<tr class="hover">
					<td>
					{#if l}
						{l.getExerciceName()}
					{:else}
						{"empty"}
					{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
