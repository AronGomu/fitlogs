<script>
	import { navigate } from "svelte-routing/src/history";
</script>

<div class="flex justify-center">
	<button
		class="btn btn-primary"
		on:click={() => navigate("/fitlogs/workout/-1")}
		>Log Today's Workout</button
	>
</div>
