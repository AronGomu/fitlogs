<script lang="ts">
	import { baseActivities } from "../shared/data/ActivityBase";
	import {
		deleteDatabase,
		loadActivities,
	} from "../shared/functions/Database";
	import { deleteDatabasePlan } from "../shared/functions/database/plan";
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-error"
		on:click={() => {
			deleteDatabase();
			location.reload();
		}}>DELETE ALL</button
	>

	<button
		class="btn btn-error"
		on:click={() => {
			deleteDatabasePlan();
			location.reload();
		}}>DELETE PLAN DB</button
	>

	<button
		class="btn btn-warning"
		on:click={() => {
			loadActivities(baseActivities, true);
			location.reload();
		}}>Set Default Activity</button
	>
</div>
