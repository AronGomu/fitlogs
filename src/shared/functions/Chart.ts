import Chart, { type ChartItem } from "chart.js/auto";

export class ChartParameter {
    constructor(
        public item: ChartItem,
        public lList: string[], public wList: number[], public cList: number[], public sList: number[],
        public minWeight: number, public maxWeight: number,
        public minCalories: number, public maxCalories: number,
        public minSteps: number, public maxSteps: number,
    ) {}
}

export function buildLineChart(cp: ChartParameter): Chart {  
    return new Chart(
            cp.item,
			{
				type: 'line',
				data: {
					labels: cp.lList,
					datasets: [
                        {
                            label: 'Weights (kg)',
                            data: cp.wList,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            yAxisID: 'weight',
                        },
                        {
                            label: 'Calories',
                            data: cp.cList,
                            borderColor: 'rgb(192, 75, 75)',
                            yAxisID: 'calories',
                            hidden: true,
                        },
                        {
                            label: 'Steps',
                            data: cp.sList,
                            borderColor: 'rgb(83, 75, 192)',
                            yAxisID: 'steps',
                            hidden: true,
                        }
                    ]
				},
				options: { 
                    responsive: true,
                    scales: {
                        weight: {
                            min: cp.minWeight,
                            max: cp.maxWeight
                        },
                        calories: {
                            min: cp.minCalories,
                            max: cp.maxCalories
                        },
                        steps: {
                            min: cp.minSteps,
                            max: cp.maxSteps
                        },
                    }
                }
			}
		)
}