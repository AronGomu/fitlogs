import { Exercice } from "./Exercice";
import { Serie } from "./Serie";
import { Weight } from "./Weight";
import { WorkoutDate } from "./WorkoutDate";

export class Workout {
    
    constructor(
        /** Id generated in the database. */
        public id: number,
        /** Date of the creation of the workout. Used as id here to differentiate with other workouts. */
        public createdAt: WorkoutDate = new WorkoutDate(),
        /** Exercice List of the workout. */
        public el: Exercice[] = []
    ) {}
    
    /** Return 0 that represent if the workouts are the same (if same date of creation), -1 if the workout was created before, 1 if created after. */
    compareWorkout(w: Workout): number {
        if (w.createdAt == this.createdAt) return 0;
        else if (w.createdAt > this.createdAt) return -1;
        else return 1;
    }
}


/** Create a real workout object and assign the values from the one fetched. */
export function getRealWorkout(w: Workout): Workout {
    const realCreatedAt: WorkoutDate = new WorkoutDate(w.createdAt.day, w.createdAt.month, w.createdAt.year);
    let realWorkout: Workout = new Workout(w.id, realCreatedAt);
  
    // loop through all the exercices
    if (w.el) {
      for (let i = 0; i < w.el.length; i++) {
        let realExercice: Exercice = new Exercice(w.el[i].name, [], w.el[i].notes);
        const e = w.el[i];
        if (e.sl) {
          for (let j = 0; j < e.sl.length; j++) {
            let realWeight: Weight = new Weight(e.sl[j].weigth.weight, e.sl[j].weigth.metric);
            let realSerie: Serie = new Serie(e.sl[j].rank, e.sl[j].rn, realWeight);
            realExercice.sl.push(realSerie);
          }
        }
        realWorkout.el.push(realExercice);
      }
    }
    return realWorkout;
  }
