<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HamburgerMenu from "./lib/HamburgerMenu.svelte";
	import ProgramForm from "./lib/ProgramForm/ProgramForm.svelte";
	import SettingsPage from "./routes/SettingsPage.svelte";
	import ExportsPage from "./routes/ExportsPage.svelte";
	import ImportsPage from "./routes/ImportsPage.svelte";
	import AdminPage from "./routes/AdminPage.svelte";
	import ActivityPage from "./routes/ActivityPage.svelte";
	import ProgramsPage from "./routes/ProgramsPage.svelte";
	import LiftsPage from "./routes/LiftsPage.svelte";
	import WorkoutsPage from "./routes/WorkoutsPage.svelte";
	import WorkoutPage from "./routes/WorkoutPage.svelte";
	import HomePage from "./routes/HomePage.svelte";
	import AboutPage from "./routes/AboutPage.svelte";
</script>

<div class="h-screen flex flex-col overflow-auto">
	<div class="flex-initial">
		<HamburgerMenu />
	</div>

	<div class="flex flex-auto justify-center h-full overflow-y-scroll">
		<div class="page-content">
			<Router>
				<Route
					path="/fitlogs/about"
					component={AboutPage}
				/>
				<Route
					path="/fitlogs/settings"
					component={SettingsPage}
				/>
				<Route
					path="/fitlogs/exports"
					component={ExportsPage}
				/>
				<Route
					path="/fitlogs/imports"
					component={ImportsPage}
				/>
				<Route
					path="/fitlogs/admin"
					component={AdminPage}
				/>
				<Route
					path="/fitlogs/activity"
					component={ActivityPage}
				/>
				<Route
					path="/fitlogs/globalPrograms"
					component={ProgramsPage}
				/>
				<Route
					path="/fitlogs/globalLifts"
					component={LiftsPage}
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
					component={ProgramsPage}
				/>
				<Route
					path="/fitlogs/lifts"
					component={LiftsPage}
				/>
				<Route
					path="/fitlogs/workouts"
					component={WorkoutsPage}
				/>
				<Route
					path="/fitlogs/workout/:urlWorkoutDate"
					component={WorkoutPage}
					let:params
				>
					<WorkoutPage urlWorkoutDate={params.urlWorkoutDate} />
				</Route>

				<Route path="/fitlogs" component={HomePage} />
				<Route path="/" component={HomePage} />
			</Router>
		</div>
	</div>
</div>

<style>
	.page-content {
		width: 90%;
	}
</style>
