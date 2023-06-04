<AutoCompleteInput label="Exercice Name" suggestions={enSuggestions} focusOnMount={true}/>

<script lang="ts">
    import { LocalStorageKeys } from "../shared/enums/LocalStorageKeys";
    import AutoCompleteInput from "./AutoCompleteInput.svelte";

    const exercicesPresets: string[] = ["Bench Press", "Squats"] ;
    localStorage.setItem(LocalStorageKeys.Exercices, JSON.stringify(exercicesPresets));
    const enSuggestions = <string[]> JSON.parse(localStorage.getItem(LocalStorageKeys.Exercices));
</script>