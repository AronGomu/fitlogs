<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import WorkoutMenu from './routes/Home.svelte';
  import Workout from './lib/WorkoutForm.svelte';
  
  import HamburgerMenu from './lib/HamburgerMenu.svelte';
</script>
  
<div class="relative">
  <HamburgerMenu/>
</div>
  
<div class="relative">
  <Router>
    <Route path="/" component={Home} />
  </Router>
</div>