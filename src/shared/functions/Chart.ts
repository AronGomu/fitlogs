import Chart, { type ChartConfiguration, type ChartData, type ChartDataset, type ChartEvent, type ChartItem, type ChartOptions, type LegendElement, type LegendItem, type PluginOptionsByType } from "chart.js/auto";

export class ChartParameter {
    constructor(
        public item: ChartItem,
        public lList: string[], public wList: number[], public cList: number[], public sList: number[],
        public minWeight: number, public maxWeight: number,
        public minCalories: number, public maxCalories: number,
        public minSteps: number, public maxSteps: number,
        public isWeightHidden: boolean = false,
        public isCaloriesHidden: boolean = true,
        public isStepsHidden: boolean = true,
    ) {}

    public nbLineShowed(): number {
        let nbLine: number = 0;
        if (!this.isWeightHidden) nbLine++;
        if (!this.isCaloriesHidden) nbLine++;
        if (!this.isStepsHidden) nbLine++;
        return nbLine;
    }
}

export function buildLineChart(cp: ChartParameter): Chart<'line'> {
    return new Chart<'line'>(
        cp.item,
        buildConfigLineChart(cp)
    )
}

function buildConfigLineChart(cp: ChartParameter): ChartConfiguration<'line'> {
    return {
        type: 'line',
        data: buildDataLineChart(cp),
        options: buildOptionLineChart(cp),
    } as ChartConfiguration<'line'>
}

function buildDataLineChart(cp: ChartParameter): ChartData<"line"> {
    return {
        labels: cp.lList,
        datasets: buildDatasetsLineChart(cp)
    } as ChartData<'line'>
}

function buildDatasetsLineChart(cp: ChartParameter): ChartDataset<'line'>[] {
    const datasets = [
        {
            label: 'Weights (kg)',
            data: cp.wList,
            borderColor: 'rgba(75, 192, 192, 1)',
            hidden: cp.isWeightHidden 
        } as ChartDataset<'line'>,
        {
            label: 'Calories',
            data: cp.cList,
            borderColor: 'rgb(192, 75, 75)',
            hidden: cp.isCaloriesHidden,
        } as ChartDataset<'line'>,
        {
            label: 'Steps',
            data: cp.sList,
            borderColor: 'rgb(83, 75, 192)',
            hidden: cp.isStepsHidden,
        } as ChartDataset<'line'>
    ]

    if (cp.nbLineShowed() === 1) return datasets;

    if (!cp.isCaloriesHidden) datasets[1].yAxisID = 'calories';
    if (!cp.isStepsHidden) datasets[2].yAxisID = 'steps';

    return datasets;
}

function buildOptionLineChart(cp: ChartParameter): ChartOptions<'line'> {
    return {
        responsive: true,
        plugins: buildPluginsLineChart(cp)
    } as ChartOptions<'line'>
}


function buildPluginsLineChart(cp: ChartParameter): PluginOptionsByType<'line'> {
    return {
        legend: {
            onClick: (e, legendItem, legend) => { return onClickLegendLineChart(cp, e, legendItem, legend) }
        }
    } as PluginOptionsByType<'line'>
}

function onClickLegendLineChart(cp: ChartParameter, e: ChartEvent, legendItem: LegendItem, legend: LegendElement<'line'>) {
    const index = legendItem.datasetIndex;
    const chart = legend.chart;

    switch (index) {
        case 0: cp.isWeightHidden = !cp.isWeightHidden; break;
        case 1: cp.isCaloriesHidden = !cp.isCaloriesHidden; break;
        case 2: cp.isStepsHidden = !cp.isStepsHidden; break;
    }
    chart.data.datasets = buildDatasetsLineChart(cp);


    chart.update();

}