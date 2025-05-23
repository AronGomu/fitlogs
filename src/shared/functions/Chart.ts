import Chart, { type CartesianScaleOptions, type ChartConfiguration, type ChartData, type ChartDataset, type ChartItem, type ChartOptions, type PluginOptionsByType, type ScaleOptionsByType } from "chart.js/auto";

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
    console.log(cp);
    
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

    if (!cp.isWeightHidden) datasets[0].yAxisID = 'weight';
    if (!cp.isCaloriesHidden) datasets[1].yAxisID = 'calories';
    if (!cp.isStepsHidden) datasets[2].yAxisID = 'steps';

    return datasets;
}

function buildOptionLineChart(cp: ChartParameter): ChartOptions<'line'> {
    return {
        responsive: true,
        scales: buildScalesLineChart(cp),
        // scales: {
        //     weight: {min: cp.minWeight, max: cp.maxWeight},
        //     calories: { min: cp.minCalories, max: cp.maxCalories },
        //     steps: { min: cp.minSteps, max: cp.maxSteps }
        // },
        // plugins: buildPluginsLineChart(cp.onClickLegendLineChart)
        plugins: buildPluginsLineChart(cp)
    } as ChartOptions<'line'>
}

function buildScalesLineChart(cp: ChartParameter) {
    const scales = {}
    const weightScale = {min: cp.minWeight, max: cp.maxWeight} as CartesianScaleOptions;
    const caloriesScale = { min: cp.minCalories, max: cp.maxCalories } as CartesianScaleOptions;
    const stepsScale = { min: cp.minSteps, max: cp.maxSteps } as CartesianScaleOptions;
    console.log(!cp.isWeightHidden,!cp.isCaloriesHidden, !cp.isStepsHidden);
    
    if (!cp.isWeightHidden) scales.weight = weightScale;
    if (!cp.isCaloriesHidden) scales.calories = caloriesScale;
    if (!cp.isStepsHidden) scales.steps = stepsScale;
    return scales;
}

function buildPluginsLineChart(cp: ChartParameter): PluginOptionsByType<'line'> {
    console.log("buildPluginsLineChart");
    return {
        legend: {
            // onClick: (e, legendItem, legend) => {return onClickLegendLineChart(e, legendItem, legend)}
            onClick: (e, legendItem, legend) => { return onClickLegendLineChart(cp, e, legendItem, legend) }
        }
    } as PluginOptionsByType<'line'>
}

function onClickLegendLineChart(cp: ChartParameter, e, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const chart = legend.chart;
    const datasets: ChartDataset<'line'>[] = chart.data.datasets;
    const dataset: ChartDataset<'line'> = datasets[index];
    const scales = chart.scales;
    const scale = scales[dataset.yAxisID];

    switch (index) {
        case 0: cp.isWeightHidden = !cp.isWeightHidden; break;
        case 1: cp.isCaloriesHidden = !cp.isCaloriesHidden; break;
        case 2: cp.isStepsHidden = !cp.isStepsHidden; break;
    }

    legend.chart.data.datasets = buildDatasetsLineChart(cp);
    legend.chart.scales = buildScalesLineChart(cp);

    console.log(e, legendItem, legend, index,
        legend.chart.data.datasets,
        legend.chart.scales
    );

    chart.update();

}