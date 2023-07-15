import { compare } from "../functions/Utilitary";
import { Exercice } from "./Exercice";
import { ExerciceGUI } from "./ExerciceGUI";
import { Workout } from "./Workout";

export class WorkoutGUI extends Workout {
    /** List of the GUI version of the exercices of the workout. */
    public elGUI: ExerciceGUI[] = [];
    /** Boolean flag to know if the accordeon is open or not. */
    public isSelfOpen: boolean = false;
    
    constructor(w: Workout) {
        super(w.id, w.createdAt, w.el);
        if (w.el) for (const e of w.el) this.elGUI.push(new ExerciceGUI(e));
    }

    /** Takes a workout and update this workout GUI. Keeping the GUI states as much as possible. */
    updateWorkout(w: Workout) {
        const oldElGUI: ExerciceGUI[] = [...this.elGUI]; // deep copy
        this.elGUI = [];
        for (const e of w.el) {
            // The exercice already exist
            const oldEGUI = oldElGUI.find(oldEGUI => oldEGUI.name == e.name)
            if (oldElGUI) this.elGUI.push(new ExerciceGUI(e, oldEGUI.isSelfOpen, oldEGUI.isExtraOpen));
            else this.elGUI.push(new ExerciceGUI(e));
        }
    }
    
    /** convert this WorkoutGUI into a simple workout object. */
    convertToWorkout(): Workout {
        return new Workout(this.id, this.createdAt, this.el);
    }

    /** Add a new empty exercice to both exercice list. */
    addNewExercice() {
        const newExercice: Exercice = new Exercice("", [], "");
        this.el.push(newExercice);
        this.elGUI.push(new ExerciceGUI(newExercice, true));
    }
}
