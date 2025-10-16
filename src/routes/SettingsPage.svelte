<script lang="ts">
    import { deleteDatabase } from "../shared/functions/Database";
    import { pageTitleWritable } from "../shared/store/pageTitleStore";

	pageTitleWritable.set("HomePage");
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center">
		<button class="btn btn-error m-4 w-40"
			on:click={() => { deleteDatabase(); location.reload(); }}
		> DELETE ALL DATA </button>
	</div>
</div>
