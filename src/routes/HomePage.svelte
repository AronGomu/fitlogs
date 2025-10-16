<script>
	import { navigate } from "svelte-routing/src/history";
</script>

<div class="flex flex-col justify-center">

	<button class="btn btn-lg btn-primary"
		on:click={() => { navigate(`/fitlogs/activity`) }}
	> ActivityList </button>

	<button class="btn btn-lg btn-primary"
		on:click={() => { navigate(`/fitlogs/activity`) }}
	> ActivityList </button>

	<button disabled class="btn btn-secondary mt-4"
		on:click={() => { navigate(`/fitlogs/setting`) }}
	> Settings </button>

	<button disabled class="btn btn-neutral mt-4"
		on:click={() => { navigate(`/fitlogs/about`) }}
	> About </button>
</div>
