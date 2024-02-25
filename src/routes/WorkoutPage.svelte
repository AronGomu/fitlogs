<script lang="ts">
	import { Workout } from "../shared/class/Workout/Workout";

	export let date: Date = null;
	let w: Workout = new Workout();

	init();

	function init() {
		if (!date) {
			date = new Date();
		} else {
			fetchWorkout();
		}
	}

	function fetchWorkout() {
		console.log(`TODO fetchWorkout`);
	}
</script>

<h1>WORKOUT</h1>
