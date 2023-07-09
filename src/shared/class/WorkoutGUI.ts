import { ExerciceGUI } from "./ExerciceGUI";
import { Workout } from "./Workout";

export class WorkoutGUI extends Workout {
    /** List of the GUI version of the exercices of the workout. */
    public elGUI: ExerciceGUI[] = [];
    
    constructor(w: Workout) {
        super(w.c, w.lm, []);
        for (const e of w.el) this.elGUI.push(new ExerciceGUI(e.n,  e.sl));
    }
    
    convertToWorkout(): Workout {
        return new Workout(this.c, this.lm, this.el);
    }

    /** Takes a workout and update this workout GUI. */
    update(w: Workout) {
        this.lm = w.lm;
        this.elGUI = [];
        for (const e of w.el) this.elGUI.push(new ExerciceGUI(e.n,  e.sl));
    }
}
