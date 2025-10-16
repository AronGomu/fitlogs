<script>
	import { navigate } from "svelte-routing/src/history";
    import { pageTitleWritable } from "../shared/store/pageTitleStore";

	pageTitleWritable.set("HomePage");
</script>

<div class="flex flex-col justify-center">

	<button class="btn btn-xl btn-primary mt-4"
		on:click={() => { navigate(`/fitlogs/activity`) }}
	> ActivityList </button>

	<button class="btn btn-xl btn-primary mt-4"
		on:click={() => { navigate(`/fitlogs/settings`) }}
	> Settings </button>

</div>
