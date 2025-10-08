<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { WorkoutDate } from "../../shared/class/Workout/WorkoutDate";
	import { NewWorkoutDateFormEvents } from "../../shared/enum/Events";
    import { dispatchPossiblyModalEvent } from "../../shared/functions/Modal";
    import DateInput from "../DateInput.svelte";

	const dispatch = createEventDispatcher();

	let date: Date = new Date();

	function submitDate() {
		console.log(NewWorkoutDateFormEvents.submitTodayDate, "comment faire remonter")

		const wd = new WorkoutDate (
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate()
		)

		dispatchPossiblyModalEvent(dispatch, true, NewWorkoutDateFormEvents.submitTodayDate, wd)

		// dispatch(NewWorkoutDateFormEvents.submitTodayDate, date)
	}
</script>

<div class="flex flex-row justify-center mb-4">
	<DateInput
		bind:date
		on:input={() => { console.log("date input activity") }}
	/>

	<button class="btn btn-primary" on:click={submitDate}>
		Create New workout	
	</button>


	
</div>

