<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import HamburgerMenu from "./lib/HamburgerMenu.svelte";
  import Workouts from "./routes/Workouts.svelte";
  import Lifts from "./routes/Lifts.svelte";


</script>

<div class="relative">
  <HamburgerMenu/>
</div>
  
<div class="flex justify-center">
  <div class="page-content">
    <Router>
      <Route path="/fitlogs/lifts" component={Lifts} />
      <Route path="/fitlogs" component={Workouts} />
      <Route path="/" component={Workouts} />
    </Router>
  </div>
</div>

<style>

  .page-content {
    width: 90%;
  }
</style>