<script>
	import { navigate } from "svelte-routing/src/history";
</script>

<div class="flex flex-col justify-center">

	<button class="btn btn-lg btn-primary"
		on:click={() => { navigate(`/fitlogs/activity`) }}
	>
		Activities
	</button>

	<!-- <button
		class="btn btn-lg btn-primary mt-4"
		on:click={() => {
			const today = new Date();
			const todayYear = today.getFullYear();
			const todayMonth = today.getMonth() + 1;
			const todayDay = today.getDate();
			navigate(
				`/fitlogs/workout/${todayYear}-${todayMonth}-${todayDay}`,
			);
		}}>Log Today's Workout</button
	> -->

	<button disabled class="btn btn-lg btn-primary mt-4"
		on:click={() => { navigate(`/fitlogs/workouts`) }}
	>
		Workouts
	</button>

	<button disabled class="btn btn-secondary mt-4"
		on:click={() => { navigate(`/fitlogs/exports`) }}
	>
		Exports
	</button>

	<button disabled class="btn btn-secondary mt-4"
		on:click={() => { navigate(`/fitlogs/settings`) }}
	>
		Settings
	</button>

	<button disabled class="btn btn-neutral mt-4"
		on:click={() => { navigate(`/fitlogs/about`) }}
	>
		About
	</button>
</div>
