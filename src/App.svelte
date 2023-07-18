<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import HamburgerMenu from "./lib/HamburgerMenu.svelte";
  import Workouts from "./routes/Workouts.svelte";
  import ExerciceSuggestions from "./routes/Lifts.svelte";

</script>

<div class="relative">
  <HamburgerMenu/>
</div>
  
<div class="flex justify-center">
  <div class="page-content">
    <Router>
      <Route path="/fitlogs/exercice-suggestions" component={ExerciceSuggestions} />
      <Route path="/fitlogs" component={Workouts} />
    </Router>
  </div>
</div>

<style>

  .page-content {
    width: 90%;
  }
</style>