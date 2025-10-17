<script lang="ts">
    import { navigate } from "svelte-routing";
    import { deleteDatabase } from "../shared/functions/Database";
    import { pageTitleWritable } from "../shared/store/pageTitleStore";

	pageTitleWritable.set("HomePage");
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center">
		<button class="btn btn-error m-4 w-40"
			on:click={() => { deleteDatabase(); navigate("/"); }}
		> DELETE ALL DATA </button>
	</div>
</div>
