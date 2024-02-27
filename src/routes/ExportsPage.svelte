<script lang="ts">
	import { exportActivities } from "../shared/functions/Activity";
	import { downloadAsJson } from "../shared/functions/Utilitary";
	import { getWorkoutsFromDatabase } from "../shared/functions/database/workout";
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-warning"
		on:click={() => {
			getWorkoutsFromDatabase().then((wl) => {
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
