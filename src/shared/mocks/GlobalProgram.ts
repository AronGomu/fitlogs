// import { Lift } from "../class/Lift/Lift"
// import { Day } from "../class/Program/Day"
// import { Program } from "../class/Program/Program"
// import { RepRange } from "../class/Program/RepRange"
// import { Superset } from "../class/Program/Superset"
// import { Exercice } from "../class/Workout/Exercice"
// import { ProgramType } from "../enum/ProgramType"
//
// // mock lift library
// const squat: Lift = new Lift(null, "Squat");
// const neckCurl: Lift = new Lift(null, "Neck Curl");
// const ohp: Lift = new Lift(null, "Overhead Press");
// const ezCurl: Lift = new Lift(null, "EZ Bar Curl");
//
// const deltDestroyer: Lift = new Lift(null, "Delt Destroyer");
// const hyperExtension: Lift = new Lift(null, "Hyper Extension");
// const krugsRows: Lift = new Lift(null, "Krugs Rows");
// const russianTwister: Lift = new Lift(null, "Russian Twister");
// const cableExtension: Lift = new Lift(null, "Cable Extension");
//
// const ohp: Lift = new Lift(null, "Overhead Press");
// const ohp: Lift = new Lift(null, "Overhead Press");
// const test: Lift = new L
//
//
//
// // Exercice Full Body Day 1 
// const emFBX3111: Exercice = new Exercice(squat, [], null, new RepRange(6, 10));
// const emFBX3112: Exercice = new Exercice(neckCurl, [], null, new RepRange(20, 30));
// const emFBX3113: Exercice = new Exercice(ohp, [], null, new RepRange(6, 10));
// const emFBX3114: Exercice = new Exercice(ezCurl, [], null, new RepRange(8, 12));
//
// const emFBX3121: Exercice = new Exercice(krugsRows, [], null, new RepRange(10, 20));
// const emFBX3122: Exercice = new Exercice(russianTwister, [], null, new RepRange(20, 30));
// const emFBX3123: Exercice = new Exercice(cableExtension, [], null, new RepRange(8, 15));
// const emFBX3124: Exercice = new Exercice(deltDestroyer, [], null, new RepRange(10, 15));
// const emFBX3125: Exercice = new Exercice(hyperExtension, [], null, new RepRange(10, 20));
//
//
//
// // const emFBX3123: Exercice = new Exercice(, [], null, new RepRange());
//
// const smFBX311: Superset = new Superset([emFBX3111, emFBX3112, emFBX3113, emFBX3114])
// const smFBX312: Superset = new Superset([emFBX3121, emFBX3122, emFBX3123, emFBX3124, emFBX3125])
//
// const dmFBX31: Day = new Day(
//   "FBX3-1",
//   [smFBX311, smFBX312]
// )
//
// const dmFBX32: Day = new Day(
//   "FBX3-2",
//   []
// )
//
// const dmFBX33: Day = new Day(
//   "FBX3-3",
//   []
// )
//
// const pmFBX3: Program = new Program(
//   0,
//   "FullBody3X",
//   ProgramType.FB,
//   "",
//   [dmFBX31, dmFBX32, dayMockFBX33]
// )
//
// const programsMock: Program[] = [
//   // todo faire le mock des programs
//   new Program(
//     0,
//     "FullBody 3X",
//     ProgramType.FB,
//     "",
//     [new Day(
//       "Day1",
//       [new Superset([new Exercice()],
//       )]
//     )
//   )
// ]
