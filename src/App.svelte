<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HamburgerMenu from "./lib/HamburgerMenu.svelte";
	import Workouts from "./routes/Workouts.svelte";
	import Lifts from "./routes/Lifts.svelte";
</script>

<div class="h-screen flex flex-col overflow-auto">
	<div class="flex-initial">
		<HamburgerMenu />
	</div>

	<div class="flex flex-auto justify-center h-full overflow-y-hidden">
		<div class="page-content">
			<Router>
				<Route path="/fitlogs/lifts" component={Lifts} />
				<Route path="/fitlogs" component={Workouts} />
				<Route path="/" component={Workouts} />
			</Router>
		</div>
	</div>
</div>

<style>
	.navbar {
	}

	.page-content {
		width: 90%;
	}
</style>
