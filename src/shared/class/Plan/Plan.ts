export class Plan {
    constructor(public id: number, public name: string, public targetWeeklyAverageCalories: number, public targetWeeklyAverageSteps: number, public isCurrent: boolean) { }
}

export function getRealPlan(plan: Plan): Plan {
    return new Plan(plan.id, plan.name, plan.targetWeeklyAverageCalories, plan.targetWeeklyAverageSteps, plan.isCurrent);
}
