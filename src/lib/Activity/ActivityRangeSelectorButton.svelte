<script lang="ts">
	import { createEventDispatcher } from "svelte";
  	import type { ActivityRangeSelectorData } from "../../shared/class/Activity/ActivityRangeSelectorData";

	const dispatch = createEventDispatcher();

	// PARAMETERS //
	export let rs: ActivityRangeSelectorData = null;
	// PARAMETERS //

	function setRange(e, nbDays) {
		dispatch("click", { input: e, value: nbDays });
	}
</script>


<button class="btn {rs.className}" on:click={ (e) => setRange(e, rs.nbDaysToShow) } >
	{ rs.label }
</button>

		