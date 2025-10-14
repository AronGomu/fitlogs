<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HamburgerMenu from "./lib/HamburgerMenu.svelte";
	import ProgramForm from "./lib/ProgramForm/ProgramForm.svelte";
	import ExportsPage from "./routes/ExportsPage.svelte";
	import ImportsPage from "./routes/ImportsPage.svelte";
	import AdminPage from "./routes/AdminPage.svelte";
	import ProgramsPage from "./routes/ProgramsPage.svelte";
	import LiftsPage from "./routes/LiftsPage.svelte";
	import WorkoutsPage from "./routes/WorkoutsPage.svelte";
	import WorkoutPage from "./routes/WorkoutPage.svelte";
	import HomePage from "./routes/HomePage.svelte";
	import AboutPage from "./routes/AboutPage.svelte";
	import ActivityList from "./routes/ActivityListPage.svelte";
	import ActivityPlanPage from "./routes/ActivityPlanPage.svelte";
	import ActivityStatsPage from "./routes/ActivityStatsPage.svelte";
</script>

<div class="h-screen flex flex-col">
	<div class="flex-initial">
		<HamburgerMenu />
	</div>
		
	<Router>
		<Route path="/fitlogs/about" component={AboutPage} />
		<Route path="/fitlogs/exports" component={ExportsPage} />
		<Route path="/fitlogs/imports" component={ImportsPage} />
		<Route path="/fitlogs/admin" component={AdminPage} />

		<Route path="/fitlogs/activity/plan" component={ActivityPlanPage} />
		<Route path="/fitlogs/activity/stats" component={ActivityStatsPage} />
		<Route path="/fitlogs/activity/list" component={ActivityList} />
		<Route path="/fitlogs/activity/**" component={ActivityList} />
		<Route path="/fitlogs/globalPrograms" component={ProgramsPage} />
		<Route path="/fitlogs/globalLifts" component={LiftsPage} />
		<Route path="/fitlogs/program/:id" component={ProgramForm} let:params >
			<ProgramForm id={Number(params.id)} />
		</Route>
		<Route path="/fitlogs/programs" component={ProgramsPage} />
		<Route path="/fitlogs/lifts" component={LiftsPage} /> 
		<Route path="/fitlogs/workouts" component={WorkoutsPage} />
		<Route path="/fitlogs/workout/:urlWorkoutDate" component={WorkoutPage} let:params >
			<WorkoutPage urlWorkoutDate={params.urlWorkoutDate} />
		</Route>

		<Route path="/fitlogs" component={HomePage} />
		<Route path="**" component={HomePage} />
	</Router>
</div>