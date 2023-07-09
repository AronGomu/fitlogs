import { ExerciceGUI } from "./ExerciceGUI";
import { Workout } from "./Workout";

export class WorkoutGUI extends Workout {
    /** List of the GUI version of the exercices of the workout. */
    public el: ExerciceGUI[] = [];
    
    constructor(w: Workout) {
        super(w.c, w.lm, []);
        for (const e of w.el) this.el.push(new ExerciceGUI(e.n,  e.sl));
    }
    
    convertToWorkout(): Workout {
        return new Workout(this.c, this.lm, this.el);
    }
}
