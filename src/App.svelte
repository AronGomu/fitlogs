<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import WorkoutMenu from './routes/WorkoutMenu.svelte';
  import Workout from './routes/Workout.svelte';
  
  import HamburgerMenu from './lib/HamburgerMenu.svelte';
</script>
  
<HamburgerMenu />
  
<div class="container">
  <Router>
    <Route path="/" component={Home} />
    <Route path="/WorkoutMenu" component={WorkoutMenu} />
    <Route path="/Workout" component={Workout} />
  </Router>
</div>