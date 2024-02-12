<script lang="ts">
	import { deleteDatabasePlan } from "../shared/functions/database/plan";
</script>

<div class="flex flex-col items-center">
	<button class="btn btn-error" on:click={() => deleteDatabasePlan()}
		>DELETE PLAN DB</button
	>
</div>
