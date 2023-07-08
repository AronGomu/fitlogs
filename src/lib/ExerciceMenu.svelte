
<script lang="ts">
import { Keys } from "../shared/enum/Keys";
import AutoCompleteInput from "./AutoCompleteInput.svelte";

const exercicesPresets: string[] = ["Bench Press", "Squats"] ;
set(Keys.Exercices, JSON.stringify(exercicesPresets));
const enSuggestions = <string[]> JSON.parse(get(Keys.Exercices));
</script>


<AutoCompleteInput label="Exercice Name" suggestions={enSuggestions} focusOnMount={true}/>