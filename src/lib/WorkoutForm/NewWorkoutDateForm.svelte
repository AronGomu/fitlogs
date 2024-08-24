<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { WorkoutDate } from "../../shared/class/Workout/WorkoutDate";
	import { NewWorkoutDateFormEvents } from "../../shared/enum/Events";

	const dispatch = createEventDispatcher();

	function submitTodayDate(): void {
		console.log(NewWorkoutDateFormEvents.submitTodayDate, "comment faire remonter")
		const today = new Date();
		dispatch(NewWorkoutDateFormEvents.submitTodayDate, new WorkoutDate (
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		))
	}
</script>

<div class="flex flex-row justify-center mb-4">
	<button class="btn btn-primary" on:click={submitTodayDate}>
		Today	
	</button>
</div>

