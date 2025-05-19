import Chart, { type ChartItem } from "chart.js/auto";

export function buildLineChart(
    item: ChartItem,
    lList: string[], wList: number[], cList: number[], sList: number[],
): Chart {  
    return new Chart(
            item,
			{
				type: 'line',
				data: {
					labels: lList,
					datasets: [
                        {
                            label: 'Weights (kg)',
                            data: wList,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            yAxisID: 'y1',
                        },
                        {
                            label: 'Calories',
                            data: cList,
                            borderColor: 'rgb(192, 75, 75)',
                            yAxisID: 'y2',
                            hidden: true,
                        },
                        {
                            label: 'Steps',
                            data: sList,
                            borderColor: 'rgb(83, 75, 192)',
                            yAxisID: 'y3',
                            hidden: true,
                        }
                    ]
				},
				options: { responsive: true }
			}
		)
}