import { Activity } from "../class/Activity/Activity"
import { getDaysInMonth, getRandomNumber, truncateNumber } from "../functions/Utilitary";

export const baseActivities: Activity[] = [
	new Activity(2024, 1, 11, 86.3, 2600, 17041),
	new Activity(2024, 1, 12, 85.4, 2500, 19975),
	new Activity(2024, 1, 13, 85.4, 4000, 15424),
	new Activity(2024, 1, 14, 85.4, 2150, 15744),
	new Activity(2024, 1, 15, 84.5, 2500, 22556),
	new Activity(2024, 1, 16, 84, 3300, 18913),
	new Activity(2024, 1, 17, 84, 3500, 19909),
	new Activity(2024, 1, 18, 84.4, 2400, 16658),
	new Activity(2024, 1, 19, 84, 2600, 27013,),
	new Activity(2024, 1, 20, 83.5, 2500, 20698,),
	new Activity(2024, 1, 21, 83.5, 2800, 25577),
	new Activity(2024, 1, 22, 84, 3000, 18943),
	new Activity(2024, 1, 23, 84.6, 3000, 21845),
	new Activity(2024, 1, 24, 84.6, 4000, 21707),
	new Activity(2024, 1, 25, 84.9, 2200, 26092),
	new Activity(2024, 1, 26, 83.3, 3000, 21498),
	new Activity(2024, 1, 27, 83.3, 2400, 19979),
	new Activity(2024, 1, 28, 83.3, 3000, 27957),
	new Activity(2024, 1, 29, 83.3, 4409, 21981),
	new Activity(2024, 1, 30, 84.3, 2815, 16968),
	new Activity(2024, 1, 31, 84.3, 2388, 22430),
	new Activity(2024, 2, 1, 84.3, 2420, 23274),
	new Activity(2024, 2, 2, 84, 2245, 30209),
	new Activity(2024, 2, 3, 84, 3328, 23402),
	new Activity(2024, 2, 4, 83, 3500, 18780),
	new Activity(2024, 2, 5, 83, 2200, 26727),
	new Activity(2024, 2, 6, 83.3, 2300, 25182),
	new Activity(2024, 2, 7, 83.3, 2050, 21957),
	new Activity(2024, 2, 8, 82.7, 3000, 25784),
	new Activity(2024, 2, 9, 82.7, 3000, 21791),
	new Activity(2024, 2, 10, 82.2, 3000, 20411),
	new Activity(2024, 2, 11, 81.3, 3150, 21409),
	new Activity(2024, 2, 12, 82.1, 2850, 21869),
	new Activity(2024, 2, 13, 81.7, 3680, 20008),
	new Activity(2024, 2, 14, 82, 2665, 20368),
	new Activity(2024, 2, 15, 82, 2550, 23490),
	new Activity(2024, 2, 16, 82, 4412, 24100),
	new Activity(2024, 2, 17, 82, 2500, 23744),
	new Activity(2024, 2, 18, 82, 3200, 18773),
	new Activity(2024, 2, 19, 82, 2750, 27059),
	new Activity(2024, 2, 20, 82, 4000, 27697),
	new Activity(2024, 2, 21, 82, 3500, 23104),
	new Activity(2024, 2, 22, 82.8, 2000, 30358),
	new Activity(2024, 2, 23, 81.2, 4100, 28743),
	new Activity(2024, 2, 24, 81.2, 2950, 21760),
	new Activity(2024, 2, 25, 80.9, 4500, 18778),
	new Activity(2024, 2, 26, 80.9, 4450, 30219),
	new Activity(2024, 2, 27, 82.9, 2400, 21391),
	new Activity(2024, 2, 28, 82.9, 5950, 22736),
	new Activity(2024, 2, 29, 83.9, 4900, 27339),
	new Activity(2024, 3, 1, 83.9, 5400, 22816),
	new Activity(2024, 3, 2, 83.6, 5500, 17318),
	new Activity(2024, 3, 3, 83.6, 7000, 17482),
	new Activity(2024, 3, 4, 83.6, 5000, 18380),
	new Activity(2024, 3, 5, 84.3, 2900, 28378),
	new Activity(2024, 3, 6, 83.8, 2200, 28000),
	new Activity(2024, 3, 7, 83.8, 2950, 23789),
	new Activity(2024, 3, 8, 82.6, 3350, 27996),
	new Activity(2024, 3, 9, 82.6, 2350, 20050),
	new Activity(2024, 3, 10, 81.6, 2350, 18172),
	new Activity(2024, 3, 11, 81.6, null, null),
]

export function generateMonthEmptyRandomActivities(year: number, month: number, day: number): Activity[] {
	const activities = [];
	for (let d = 1; d <= day; d++) {
		const a = new Activity(year, month, d, null, null, null);
		activities.push(a);
	}
	return activities;
}

export function generateYearEmptyRandomActivities(year: number, month: number, day: number): Activity[] {
	const activities = [];
	for (let m = 1; m <= month; m++) {
		let mActivities = [];
		if (m !== month) {
			const dNumber = getDaysInMonth(year, m);
			mActivities = generateMonthEmptyRandomActivities(year, m,  dNumber);
			activities.push(...mActivities);
		} else {
			mActivities = generateMonthEmptyRandomActivities(year, m,  day);
			activities.push(...mActivities);
			break;
		}
	}
	return activities;
}

export type Progression = 'Bulk' | 'Cut' | 'Maintenance';

export function determineProgression() {

}

/** return updated weight */
export function fillActivity(a: Activity, currentWeight: number, p: Progression): number {
	let wFluctuation: number;
	if (p === 'Bulk') wFluctuation = getRandomNumber(-2, 5);
	else if (p === 'Cut') wFluctuation = getRandomNumber(-8, 2);
	else if (p === 'Maintenance') wFluctuation = getRandomNumber(-2, 2);
	wFluctuation = wFluctuation / 10;
	
	const baselineCalories = 3000;
	const baselineSteps = 20000;
	a.weight = currentWeight + wFluctuation;
	a.calories = baselineCalories + (wFluctuation * 770);
	a.steps = baselineSteps;

	return a.weight;
}

export function setNewGoal(p: Progression, currentWeight: number, weightGoal: number, daysLeft: number) {
	const progressionTypeChoice = getRandomNumber(0, 2);
	if (progressionTypeChoice === 0) p = 'Bulk';
	if (progressionTypeChoice === 1) p = 'Cut';
	if (progressionTypeChoice === 2) p = 'Maintenance';
	daysLeft = getRandomNumber(15, 180);
	console.log(`CURRENT WEIGHT ${currentWeight} - STARTING ${p} - WEIGHT GOAL ${weightGoal} - DAYS LEFT ${daysLeft}`);

}


/** Generate semi-realistic random activities for the last n years of a lifter. */
export function generateRandomActivities(n: number, startingWeight: number): Activity[] {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();

	const activities = [];

	for (let i = n; i >= 0; i--) {
		const yearToGenerate = year - i;
		if (yearToGenerate === year) activities.push(...generateYearEmptyRandomActivities(year, month, day));
		else activities.push(
			...generateYearEmptyRandomActivities(
				yearToGenerate, 12, getDaysInMonth(yearToGenerate, 12)
			)
		);
	}

	let currentWeight: number = startingWeight;
	let weightGoal: number;
	let p: Progression;
	let daysLeft: number = 0;

	for (let i = 0; i < activities.length; i++) {
		const a = activities[i];

		if (p === 'Bulk' && currentWeight > weightGoal) setNewGoal(p, currentWeight, weightGoal, daysLeft);
		else if (p === 'Cut' && currentWeight < weightGoal) setNewGoal(p, currentWeight, weightGoal, daysLeft);
		else if (p === 'Maintenance' && daysLeft === 0) setNewGoal(p, currentWeight, weightGoal, daysLeft);

		currentWeight = fillActivity(a, currentWeight, p);
		daysLeft--;
	}

	return activities;
}


