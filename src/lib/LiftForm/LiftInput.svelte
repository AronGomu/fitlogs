<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { Lift } from "../../shared/class/Lift/Lift";

	const dispatch = createEventDispatcher();

	export let lift: Lift = null;

	function openLiftSelector() {
		dispatch("openLiftSelector")
	}

</script>

<input 
	type="text" 
	placeholder="Choose Lift" 
	class="input input-bordered w-full max-w-xs" 
	bind:value={lift.name} 
	on:click={() => openLiftSelector()}
/>
