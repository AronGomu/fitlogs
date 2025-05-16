export class Plan {
    constructor(
        public targetWeeklyAverageCalories: number,
        public targetWeeklyAverageSteps: number
    ) { }
}

export function getRealPlan(plan: Plan): Plan {
    return new Plan(plan.targetWeeklyAverageCalories, plan.targetWeeklyAverageSteps);
}
