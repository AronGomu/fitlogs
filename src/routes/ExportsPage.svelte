<script lang="ts">
	import { exportActivities } from "../shared/functions/Activity";
	import { downloadAsJson } from "../shared/functions/Utilitary";
	import { getWorkoutsFromDatabase } from "../shared/functions/database/workout";
	import { navigate } from "svelte-routing";
</script>

<div class="flex flex-col items-center mt-10">
	<button
		class="btn btn-primary w-40 "
		on:click={() => {
			getWorkoutsFromDatabase().then((wl) => {
				downloadAsJson(wl, "data");
			});
		}}>Export All Workouts</button
	>

	<button
		class="btn btn-primary w-40 mt-4"
		on:click={() => {
			exportActivities();
		}}>Export Activities Data</button
	>
</div>


<div class="flex justify-center">
  <button class="btn btn-warning w-30 m-10" on:click={() => {navigate("/fitlogs/");}}>Back To Menu</button>
</div>

