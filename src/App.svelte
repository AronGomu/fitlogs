<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HamburgerMenu from "./lib/HamburgerMenu.svelte";
	import AdminPage from "./routes/AdminPage.svelte";
	import HomePage from "./routes/HomePage.svelte";
	import ActivityStatsPage from "./routes/ActivityStatsPage.svelte";
	import ActivityListPage from "./routes/ActivityListPage.svelte";
	import SettingsPage from "./routes/SettingsPage.svelte";
</script>

<div class="h-screen flex flex-col">
	<div class="flex-initial">
		<HamburgerMenu />
	</div>
		
	<Router>
		<Route path="/fitlogs/settings" component={SettingsPage} />
		<Route path="/fitlogs/admin" component={AdminPage} />
		<Route path="/fitlogs/stats" component={ActivityStatsPage} />
		<Route path="/fitlogs/activity" component={ActivityListPage} />

		<Route path="/fitlogs" component={HomePage} />
		<Route path="**" component={HomePage} />
	</Router>
</div>