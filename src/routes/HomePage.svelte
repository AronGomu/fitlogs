<script>
	import { navigate } from "svelte-routing/src/history";
</script>

<div class="flex justify-center">
	<button
		class="btn btn-primary"
		on:click={() => {
			const today = new Date();
			const todayYear = today.getFullYear();
			const todayMonth = today.getMonth() + 1;
			const todayDay = today.getDate();
			navigate(`/fitlogs/workout/${todayYear}-${todayMonth}-${todayDay}`);
		}}
		>Log Today's Workout</button
	>
</div>
