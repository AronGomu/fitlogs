<script lang="ts">
	import { generateRandomActivities } from "../shared/data/ActivityBase";
    import { baseLifts } from "../shared/data/LiftsBase";
	import {
		deleteDatabase,
		loadActivities,
	} from "../shared/functions/Database";
    import { loadLifts } from "../shared/functions/database/lift";
	import { deleteDatabasePlan } from "../shared/functions/database/plan";
    import { deleteDatabaseWorkout } from "../shared/functions/database/workout";

	generateRandomActivities(10, 80);
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabase();
			location.reload();
		}}>DELETE ALL DBS
	</button>

	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabasePlan();
			location.reload();
		}}>DELETE PLAN DB
	</button>

	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabaseWorkout();
			location.reload();
		}}>DELETE WORKOUT DB
	</button>

	<button
		class="btn btn-warning m-4 w-40"
		on:click={() => {
			loadActivities(generateRandomActivities(10, 80), true);
		}}>POPULATE ACTIVITIES
	</button>

	<button
		class="btn btn-warning m-4 w-40"
		on:click={() => {
			loadLifts(baseLifts, true);
		}}>POPULATE LIFTS
	</button>
</div>
