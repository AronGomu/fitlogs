<script lang="ts">
	import { exportActivities } from "../shared/functions/Activity";
	import { fetchWorkoutList } from "../shared/functions/Database";
	import { downloadAsJson } from "../shared/functions/Utilitary";
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-warning"
		on:click={() => {
			fetchWorkoutList().then((wl) => {
				downloadAsJson(wl, "data");
			});
		}}>Export All Data</button
	>

	<button
		class="btn btn-warning"
		on:click={() => {
			exportActivities();
		}}>Export Activities Data</button
	>
</div>
