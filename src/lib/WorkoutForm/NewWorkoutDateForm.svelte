<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { WorkoutDate } from "../../shared/class/Workout/WorkoutDate";
	import { NewWorkoutDateFormEvents } from "../../shared/enum/Events";
    import { dispatchPossiblyModalEvent } from "../../shared/functions/Modal";

	const dispatch = createEventDispatcher();

	function submitTodayDate(): void {
		console.log(NewWorkoutDateFormEvents.submitTodayDate, "comment faire remonter")

		const today = new Date();
		const date = new WorkoutDate (
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		)

		dispatchPossiblyModalEvent(dispatch, true, NewWorkoutDateFormEvents.submitTodayDate, date)

		// dispatch(NewWorkoutDateFormEvents.submitTodayDate, date)
	}
</script>

<div class="flex flex-row justify-center mb-4">
	<button class="btn btn-primary" on:click={submitTodayDate}>
		Today	
	</button>
</div>

