<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HamburgerMenu from "./lib/HamburgerMenu.svelte";
	import Workouts from "./routes/Workouts.svelte";
	import Lifts from "./routes/Lifts.svelte";
	import Programs from "./routes/Programs.svelte";
	import ProgramForm from "./lib/ProgramForm/ProgramForm.svelte";
	import WorkoutForm from "./lib/WorkoutForm/WorkoutForm.svelte";
	import Activity from "./routes/Activity.svelte";
</script>

<div class="h-screen flex flex-col overflow-auto">
	<div class="flex-initial">
		<HamburgerMenu />
	</div>

	<div class="flex flex-auto justify-center h-full overflow-y-scroll">
		<div class="page-content">
			<Router>
				<Route
					path="/fitlogs/activity"
					component={Activity}
				/>
				<Route
					path="/fitlogs/globalPrograms"
					component={Programs}
				/>
				<Route
					path="/fitlogs/globalLifts"
					component={Lifts}
				/>
				<Route
					path="/fitlogs/program/:id"
					component={ProgramForm}
					let:params
				>
					<ProgramForm id={Number(params.id)} />
				</Route>
				<Route
					path="/fitlogs/programs"
					component={Programs}
				/>
				<Route
					path="/fitlogs/lifts"
					component={Lifts}
				/>
				<Route
					path="/fitlogs/workout/:id"
					component={WorkoutForm}
					let:params
				>
					<WorkoutForm id={Number(params.id)} />
				</Route>

				<Route path="/fitlogs" component={Workouts} />
				<Route path="/" component={Workouts} />
			</Router>
		</div>
	</div>
</div>

<style>
	.page-content {
		width: 90%;
	}
</style>
