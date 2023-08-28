import type { Lift } from "../class/Lift/Lift";
import type { Program } from "../class/Program/Program";
import { Superset } from "../class/Program/Superset";
import { Exercice } from "../class/Workout/Exercice";
import { ExerciceSuggestionsBase } from "../data/LiftsBase";
import { ProgramType } from "../enum/ProgramType";

export async function fetchGlobalLifts(): Promise<Lift[]> {
  //todo : link this function to the server/api that host the data

  // mock
  return ExerciceSuggestionsBase;
}

export async function fetchGlobalPrograms(): Promise<Program[]> {
  //todo : link this function to the server/api that host the data

  //mock
  return
}

const programsMock: Program[] = [
  // todo faire le mock des programs
  new Program(0, "FullBody 3X", ProgramType.FB, "",
    [new Day("Day1", [new Superset([new Exercice()])])])
]
