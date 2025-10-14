<script lang="ts">
  import {
    formatDateWithSpelledOutMonth,
    last,
  } from "../shared/functions/Utils";
  import { Workout } from "../shared/class/Workout/Workout";
  import { Settings } from "../shared/class/Settings";
  import { WorkoutDate } from "../shared/class/Workout/WorkoutDate";
  import {
    getWorkoutFromDatabase,
    putWorkoutInDatabase,
  } from "../shared/database/workout";
  import { putLiftInDatabase } from "../shared/database/lift";
  import LiftInput from "../lib/LiftForm/LiftInput.svelte";
  import LiftSelector from "../lib/LiftForm/LiftSelector.svelte";
  import LiftForm from "../lib/LiftForm/LiftForm.svelte";
  import type { Exercice } from "../shared/class/Workout/Exercice";
  import Modal from "../lib/Generic/Modal.svelte";
  import { LiftFormEvents, LiftSelectorEvents } from "../shared/enum/Events";
  import InputNumber from "../lib/WorkoutForm/inputs/InputNumber.svelte";
  import { Serie } from "../shared/class/Workout/Serie";
  import { Weight } from "../shared/class/Workout/Weight";
  import { navigate } from "svelte-routing";
  import Loading from "../lib/Generic/Loading.svelte";

  export let urlWorkoutDate: string = null;
  let settings: Settings = new Settings();

  let workout: Workout;

  let isWorkoutLoaded: boolean = false;

  let showLiftSelector: boolean = false;

  /** Exercice containing the lift to sent to the DB for update or adding. */
  let liftSelectorExercice: Exercice = null;

  let showLiftForm: boolean = false;

  init();

  async function init() {
    fetchSettings().then((fs) => (settings = fs));

    const emptyWorkout = parseURLWorkoutDate();
    workout = await fetchWorkout(emptyWorkout);

    // if the workout does not exist, we create it
    if (!workout) {
      workout = await putWorkoutInDatabase(emptyWorkout);
    }

    isWorkoutLoaded = true;
  }

  // Init Functions
  function parseURLWorkoutDate(): Workout {
    const urlWorkoutDateSplitted = urlWorkoutDate.split("-");
    if (urlWorkoutDateSplitted.length < 3) {
      throw new Error("urlWorkoutDateSplitted is not right");
    }

    const year = Number(urlWorkoutDateSplitted[0]);
    const month = Number(urlWorkoutDateSplitted[1]);
    const day = Number(urlWorkoutDateSplitted[2]);

    const wd = new WorkoutDate(year, month, day);

    return new Workout(wd, []);
  }

  async function fetchWorkout(w: Workout): Promise<Workout> {
    return await getWorkoutFromDatabase(w.createdAt);
  }

  // Events functions

  function onClickAddExercice() {
    workout.addNewExercice();
    updateWorkout();
  }

  function deleteExercice(e: Exercice) {
    for (let i = 0; i < workout.el.length; i++) {
      if (e === workout.el[i]) workout.el.splice(i, 1);
    }
    updateWorkout();
  }

  function onClickAddSet(e: Exercice) {
    console.log(`onClickAddSet`, e);

    liftSelectorExercice = e;

    if (!e.series) e.series = [];

    let newSerieWeight: Weight = new Weight(0, settings.wm);
    let newSerieReps: number = 0;
    let newSerieRank: number = 1;

    if (e.series.length > 0) {
      const lastSerie = last(e.series);
      newSerieWeight = lastSerie.weight;
      newSerieRank = e.series.length;
    }

    e.series.push(new Serie(newSerieRank, newSerieReps, newSerieWeight));

    updateWorkout();
  }

  async function updateWeight(
    exercice: Exercice,
    serie: Serie,
    event: any
  ): Promise<void> {
    console.log("updateWeight");
    console.log("exercice", exercice);
    console.log("event.detail", event.detail);
    console.log(`${serie.weight.weight} =? ${event.detail.value}`);

    liftSelectorExercice = exercice;
    serie.weight.weight = Number(event.detail.value);
    console.log(workout);

    updateWorkout();

    for (const s of exercice.series) {
      console.log(s == serie);
      console.log(s.weight.weight);
    }
  }

  async function updateReps(
    exercice: Exercice,
    serie: Serie,
    event: any
  ): Promise<void> {
    console.log("updateReps");
    console.log("exercice", exercice);
    console.log("event.detail", event.detail);
    console.log(`${serie.reps} =? ${event.detail.value}`);

    liftSelectorExercice = exercice;
    serie.reps = Number(event.detail.value);
    console.log(workout);

    updateWorkout();

    for (const s of exercice.series) {
      console.log(s == serie);
      console.log(s.reps);
    }
  }

  function onSetLift(event) {
    liftSelectorExercice.lift = event.detail;
    updateWorkout();
    resetUI();
  }

  function onOpenLiftForm(event) {
    showLiftSelector = false;
    showLiftForm = true;
  }

  async function onAddLift(event): Promise<void> {
    const liftToAddToDB = event.detail;
    const liftAdded = await putLiftInDatabase(liftToAddToDB);
    if (!liftAdded) {
      console.error(
        "Something went wrong adding the lift to the DB from WorkoutPage!"
      );
      return;
    }
    liftSelectorExercice.lift = liftAdded;
    updateWorkout();
    resetUI();
  }

  // Global functions
  async function updateWorkout() {
    const fetchedWorkout = await putWorkoutInDatabase(workout);

    if (!fetchedWorkout) {
      throw new Error("Updated workout is null in database ?");
    }

    workout = fetchedWorkout;
    workout.el = workout.el;
  }

  function resetUI() {
    showLiftSelector = false;
    showLiftForm = false;
    liftSelectorExercice = null;
  }

  function gotoWorkouts() {
    navigate("/fitlogs/workouts");
  }
</script>

{#if !isWorkoutLoaded}
  <Loading />
{:else}
  <div id="workout" class="flex flex-grow flex-col items-center">
    <h1 class="text-xl mb-4">
      {formatDateWithSpelledOutMonth(workout.createdAt.getDate())}
    </h1>

    {#each workout.el as exercice}
      <LiftInput
        lift={exercice.lift}
        value={exercice.lift.getFullName()}
        on:openLiftSelector={() => {
          liftSelectorExercice = exercice;
          showLiftSelector = true;
        }}
      ></LiftInput>

      {#each exercice.series as serie, index}
        <div class="flex space-x-4 mt-4">
          <div>Set {index + 1}</div>
          <InputNumber
            placeholder="Weight"
            metric={settings.wm}
            value={serie.weight.weight}
            on:input={(e) => updateWeight(exercice, serie, e)}
            className="input-lg w-20"
          ></InputNumber>
          <div class="ml-4 mr-4">X</div>
          <InputNumber
            placeholder="Repetitions"
            value={serie.reps}
            on:input={(e) => updateReps(exercice, serie, e)}
            className="input-lg w-10"
          ></InputNumber>
        </div>
      {/each}
      <button
        class="btn btn-primary w-30 mt-2 mb-12"
        on:click={() => onClickAddSet(exercice)}>Add set</button
      >
    {/each}

    <button
      class="btn btn-secondary w-30 mt-14"
      on:click={() => onClickAddExercice()}>Add Exercice</button
    >
  </div>

  <div class="flex justify-center">
    <button class="btn btn-warning w-30 m-10" on:click={() => gotoWorkouts()}
      >GOTO WORKOUTS</button
    >
  </div>
{/if}

<Modal
  component={LiftSelector}
  events={LiftSelectorEvents}
  bind:show={showLiftSelector}
  on:setLift={(event) => onSetLift(event)}
  on:openLiftForm={(event) => {
    onOpenLiftForm(event);
  }}
></Modal>

<Modal
  component={LiftForm}
  events={LiftFormEvents}
  bind:show={showLiftForm}
  on:addLift={(event) => onAddLift(event)}
></Modal>
